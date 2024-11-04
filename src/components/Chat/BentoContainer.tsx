import { ChatBubbleIcon, ImageIcon } from '@radix-ui/react-icons';
import { BentoCard, BentoGrid } from '../ui/bento-grid';
import { LightbulbIcon, SparklesIcon } from 'lucide-react';

const features = [
  {
    Icon: SparklesIcon,
    name: 'Key Features',
    description:
      'Powered by OpenAIs latest models High-quality image generation Natural language understanding Real-time responses.',
    href: '/',
    cta: 'Learn more',
    background: (
      <img
        className="absolute opacity-60"
        src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/03/thanos-and-sacred-timeline.jpg?q=70&fit=crop&w=1140&h=&dpr=1"
      />
    ),
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
  },
  {
    Icon: ChatBubbleIcon,
    name: 'AI Chat Assistant',
    description:
      'Engage in natural conversations with our advanced AI chatbot. Get answers, brainstorm ideas, or just chat about any topic.',
    href: '/',
    cta: 'Learn more',
    background: (
      <img
        className="absolute opacity-60 transform -translate-y-20" // Added transform -translate-y-20
        src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/03/thanos-and-sacred-timeline.jpg?q=70&fit=crop&w=1140&h=&dpr=1"
      />
    ),
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: LightbulbIcon,
    name: 'Chat ominaisuudet',
    description:
      'Start a chat, type your prompt, get instant AI-powered results.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    Icon: LightbulbIcon,
    name: 'Kuva ominaisuudet',
    description:
      'Start a chat, Enter your image description, Get your AI-created image instantly.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    Icon: ImageIcon,
    name: 'Image Generation',
    description:
      'Transform your ideas into stunning images. Create artwork, designs, and visuals using cutting-edge AI technology.',
    href: '/',
    cta: 'Learn more',
    background: (
      <img
        className="absolute opacity-60 transform -translate-y-20" // Added transform -translate-y-20
        src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/03/thanos-and-sacred-timeline.jpg?q=70&fit=crop&w=1140&h=&dpr=1"
      />
    ),
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
  },
];

export async function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map(feature => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
