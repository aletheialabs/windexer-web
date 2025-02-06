// src/components/home/FeaturesSection.tsx
'use client';

import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { Network, Zap } from 'lucide-react';

interface Feature {
  icon: ReactElement;
  title: string;
  description: string;
  colorClass: string;
}

interface Metric {
  label: string;
  value: string;
  description?: string;
}

const features: Feature[] = [
  {
    icon: <Network className="w-8 h-8" />,
    title: 'Decentralized Architecture',
    description: 'Built on IPDM protocol and libp2p gossipsub network for true decentralization and resilience.',
    colorClass: 'text-blue-400 bg-blue-400/10'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'High Performance',
    description: 'Optimized for Solana\'s high-throughput environment with efficient data processing.',
    colorClass: 'text-purple-400 bg-purple-400/10'
  },
];

const metrics: Metric[] = [
  { label: 'Transaction Processing', value: 'High TPS', description: 'Average transactions processed per second' },
  { label: 'Target Network Latency', value: '<100ms', description: 'Average end-to-end latency' },
  { label: 'Target Node Coverage', value: '1000+', description: 'Active nodes in the network' },
  { label: 'Data Reliability', value: '99.99%', description: 'System uptime and data availability' }
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-24"
        >
          {/* Features Grid */}
          <div className="space-y-16">
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Built for the Future of Blockchain
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                wIndexer combines cutting-edge technology with practical solutions 
                to create a robust indexing infrastructure.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 
                           hover:bg-gray-750 transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-12 h-12 rounded-lg ${feature.colorClass} 
                                flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <motion.div variants={itemVariants} className="space-y-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Network Metrics</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Real-time performance metrics of the wIndexer network
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm 
                           border border-gray-700 text-center"
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-gray-300 font-medium mb-1">{metric.label}</div>
                  {metric.description && (
                    <div className="text-sm text-gray-400">{metric.description}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}