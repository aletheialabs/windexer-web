import { Github, Twitter, MessageSquare } from 'lucide-react';

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Working Group', href: '/working-group' },
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: '/community' }
    ],
    social: [
        {
          name: 'GitHub',
          href: 'https://github.com/windexer',
          icon: Github
        },
        {
          name: 'Twitter',
          href: 'https://twitter.com/windexer',
          icon: Twitter
        },
        {
          name: 'Discord',
          href: 'https://discord.gg/windexer',
          icon: MessageSquare
        }
      ]
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              wIndexer
            </div>
            <p className="text-gray-400 max-w-md">
              A decentralized autonomous incentivized indexing layer for Solana. Building the future of blockchain infrastructure.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} wIndexer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;