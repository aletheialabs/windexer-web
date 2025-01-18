import { motion } from 'framer-motion';
import { Database, Network, Lock, Zap, Server, Coins } from 'lucide-react';

const features = [
  {
    icon: <Network className="w-8 h-8" />,
    title: 'Decentralized Architecture',
    description: 'Built on IPDM protocol and libp2p gossipsub network for true decentralization and resilience.',
    color: 'blue'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'High Performance',
    description: 'Optimized for Solana\'s high-throughput environment with efficient data processing.',
    color: 'purple'
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Advanced Indexing',
    description: 'Sophisticated indexing algorithms for fast and efficient data retrieval.',
    color: 'green'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Secure by Design',
    description: 'Built with security-first principles and comprehensive validation mechanisms.',
    color: 'red'
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: 'Flexible Integration',
    description: 'Easy integration with existing infrastructure through multiple interfaces.',
    color: 'yellow'
  },
  {
    icon: <Coins className="w-8 h-8" />,
    title: 'Economic Incentives',
    description: 'Sustainable economic model ensuring long-term network participation.',
    color: 'pink'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Built for the Future of Blockchain
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            wIndexer combines cutting-edge technology with practical solutions to create a robust indexing infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-750 transition-colors"
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-500/10 flex items-center justify-center mb-4`}>
                <div className={`text-${feature.color}-400`}>{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Technical Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Transaction Processing', value: '50K+ TPS' },
            { label: 'Network Latency', value: '<100ms' },
            { label: 'Node Coverage', value: '1000+' },
            { label: 'Data Reliability', value: '99.99%' }
          ].map((metric, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {metric.value}
              </div>
              <div className="text-gray-400">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;