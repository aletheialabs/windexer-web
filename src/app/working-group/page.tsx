'use client';

import { motion } from 'framer-motion';
import { Calendar, BookOpen, Video, MessageCircle } from 'lucide-react';

interface Event {
  title: string;
  date: string;
  time: string;
  description: string;
}

interface ResearchArea {
  title: string;
  description: string;
}

export default function WorkingGroupPage(): React.ReactElement {
  const upcomingEvents: Event[] = [
    {
      title: 'IPDM Working Group Call',
      date: '2024-02-01',
      time: '15:00 UTC',
      description: 'Discussion on advanced compression techniques for blockchain data'
    },
    {
      title: 'Network Architecture Workshop',
      date: '2024-02-08',
      time: '16:00 UTC',
      description: 'Deep dive into wIndexer network architecture'
    }
  ];

  const researchAreas: ResearchArea[] = [
    { title: 'Data Compression', description: 'Advanced techniques for blockchain-specific data structures' },
    { title: 'Network Topology', description: 'Optimized routing algorithms for mesh networks' },
    { title: 'State Sync', description: 'Novel approaches to state synchronization' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            wIndexer Working Group
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join our community of researchers, developers, and innovators working to build the future of decentralized indexing.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Video className="w-8 h-8 text-blue-400" />,
              title: 'Join Next Call',
              description: 'Participate in our weekly working group calls',
              action: 'Schedule Now'
            },
            {
              icon: <MessageCircle className="w-8 h-8 text-purple-400" />,
              title: 'Discussion Forum',
              description: 'Engage in technical discussions and proposals',
              action: 'Join Forum'
            },
            {
              icon: <BookOpen className="w-8 h-8 text-green-400" />,
              title: 'Research Papers',
              description: 'Access our technical papers and specifications',
              action: 'Read Papers'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center mb-4">
                {item.icon}
                <h3 className="ml-3 text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-400 mb-4">{item.description}</p>
              <button className="text-blue-400 hover:text-blue-300 font-medium">
                {item.action} →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-lg bg-gray-800"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="ml-2 text-gray-300">{event.date} at {event.time}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-400">{event.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  Join Event
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Research Areas */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Current Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchAreas.map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-lg bg-gray-800 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                <p className="text-gray-400 mb-4">{area.description}</p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">Active researchers: 12</span>
                  <a href={`/research/${area.title.toLowerCase()}`} className="ml-auto text-blue-400 hover:text-blue-300">
                    Learn more →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center p-8 rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Contribute?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our working group and help shape the future of decentralized indexing. We welcome researchers, developers, and enthusiasts.
            </p>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
              Apply to Join
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}