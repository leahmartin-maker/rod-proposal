const express = require('express');
const router = express.Router();
const { authMiddleware } = require('./middleware/authMiddleware');
const supabase = require('./supabaseClient');

// GET /specials - fetch all specials
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('specials')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ specials: data });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

/**
 * POST /specials
 * Create a new special (chefs/managers only)
 * - If name or photo is new, status is 'pending' (needs Rod's approval)
 * - If reusing an approved special (no name/photo change), status is 'approved'
 *
 * Request body: { name, description, price, photo_url, restaurant_id, reuse_special_id (optional) }
 */
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, price, photo_url, restaurant_id, reuse_special_id } = req.body;
  const user = req.user;

  // Only allow chefs, managers, or owner
  const allowedRoles = [1, 2, 3]; // 1=owner, 2=manager, 3=chef
  if (!user.user_metadata || !allowedRoles.includes(user.user_metadata.role_id)) {
    return res.status(403).json({ error: 'Insufficient permissions.' });
  }

  // If reusing an approved special, skip approval if name/photo are unchanged
  if (reuse_special_id) {
    // Fetch the approved special
    const { data: oldSpecial, error: fetchError } = await supabase
      .from('specials')
      .select('*')
      .eq('id', reuse_special_id)
      .eq('status', 'approved')
      .single();
    if (fetchError || !oldSpecial) {
      return res.status(404).json({ error: 'Approved special not found.' });
    }
    // If name and photo_url are unchanged, auto-approve
    if (oldSpecial.name === name && oldSpecial.photo_url === photo_url) {
      const { data, error } = await supabase
        .from('specials')
        .insert([
          {
            name,
            description,
            price,
            photo_url,
            restaurant_id,
            created_by: user.id,
            status: 'approved',
            approved_by: user.id,
            approved_at: new Date().toISOString(),
            reuse_of: reuse_special_id
          }
        ])
        .select();
      if (error) return res.status(400).json({ error: error.message });
      return res.status(201).json({ message: 'Special reused and approved.', special: data[0] });
    }
    // If name or photo changed, needs approval
  }

  // New or edited special: status is 'pending', needs Rod's approval
  const { data, error } = await supabase
    .from('specials')
    .insert([
      {
        name,
        description,
        price,
        photo_url,
        restaurant_id,
        created_by: user.id,
        status: 'pending',
        reuse_of: reuse_special_id || null
      }
    ])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Special created and pending approval.', special: data[0] });
});

module.exports = router;

