// Reusable HardKnocks-themed components for dashboards

interface CardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function HKCard({ title, children, action }: CardProps) {
  return (
    <div className="rounded-2xl shadow-lg bg-black/80 border border-red-700 p-4 text-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-red-400 font-bold uppercase">{title}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

interface QuickLinkProps {
  label: string;
  href: string;
  gradient?: 'red-first' | 'red-second' | 'balanced';
}

export function HKQuickLink({ label, href, gradient = 'balanced' }: QuickLinkProps) {
  let gradientClass = 'bg-gradient-to-br from-red-700 to-black text-white';
  
  if (gradient === 'red-second') {
    gradientClass = 'bg-gradient-to-br from-black to-red-700 text-white';
  } else if (gradient === 'balanced') {
    gradientClass = 'bg-gradient-to-br from-red-700 to-black text-white';
  }

  return (
    <a 
      href={href} 
      className={`flex-1 rounded-xl py-3 text-center font-bold ${gradientClass} shadow hover:scale-105 transition`}
    >
      {label}
    </a>
  );
}

interface FacebookPostProps {
  title?: string;
  postContent: string;
  postDate: string;
  likes?: number;
  comments?: number;
}

export function HKFacebookPost({ 
  title = "Latest Facebook Post", 
  postContent, 
  postDate,
  likes = 0,
  comments = 0
}: FacebookPostProps) {
  return (
    <HKCard 
      title={title}
      action={
        <a href="#" className="text-xs bg-red-700 hover:bg-red-800 text-white rounded px-2 py-1 font-semibold">
          Share
        </a>
      }
    >
      <div className="space-y-3">
        <div className="text-sm text-zinc-300 leading-relaxed">
          {postContent}
        </div>
        <div className="text-xs text-zinc-500 border-t border-zinc-700 pt-2">
          <p>{postDate}</p>
          <div className="flex gap-3 mt-1">
            <span>❤️ {likes} likes</span>
            <span>💬 {comments} comments</span>
          </div>
        </div>
      </div>
    </HKCard>
  );
}

interface StatRowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export function HKStatRow({ label, value, highlight }: StatRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-lg font-semibold">{label}</span>
      <span className={`text-2xl font-extrabold ${highlight ? 'text-red-400' : 'text-white'}`}>
        {value}
      </span>
    </div>
  );
}
