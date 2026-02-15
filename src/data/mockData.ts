export type MessageType = "text" | "deleted" | "system" | "poll" | "link";

export interface PollOption {
  text: string;
  votes: number;
  voted: boolean;
}

export interface PollData {
  question: string;
  options: PollOption[];
}

export interface LinkData {
  url: string;
  title: string;
  description: string;
  domain: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sent: boolean;
  read?: boolean;
  type?: MessageType;
  poll?: PollData;
  link?: LinkData;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  hasMention: boolean;
  isTyping: boolean;
  lastMessageSent: boolean;
  lastMessageRead: boolean;
  isDeleted: boolean;
  online: boolean;
  phone?: string;
  about?: string;
  messages: Message[];
}

// Avatar colors for generating placeholder avatars
const avatarColors = [
  "#E17076", "#7BC862", "#E5C441", "#65AADD", "#A695E7",
  "#EE7AAE", "#6EC9CB",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function generateAvatarSvg(name: string, index: number): string {
  const color = avatarColors[index % avatarColors.length];
  const initials = getInitials(name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="50" fill="${color}"/>
    <text x="50" y="50" text-anchor="middle" dy="0.35em" font-family="Arial,sans-serif" font-size="36" font-weight="600" fill="white">${initials}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Jenny ❤️",
    avatar: generateAvatarSvg("Jenny", 0),
    lastMessage: 'You reacted 🥰 to "That\'s good..."',
    lastMessageTime: "16:14",
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
    hasMention: false,
    isTyping: false,
    lastMessageSent: true,
    lastMessageRead: true,
    isDeleted: false,
    online: true,
    phone: "+1 (555) 123-4567",
    about: "Living my best life ✨",
    messages: [
      { id: "1a", text: "Hey baby, how's your day going? 💕", timestamp: "14:20", sent: false, read: true },
      { id: "1b", text: "It's been great! Just finished lunch. What about you?", timestamp: "14:25", sent: true, read: true },
      { id: "1c", text: "Same here! I was thinking we could grab dinner tonight?", timestamp: "14:30", sent: false, read: true },
      { id: "1d", text: "That sounds perfect! Where do you want to go?", timestamp: "14:35", sent: true, read: true },
      { id: "1e", text: "How about that new Italian place downtown? 🍝", timestamp: "15:00", sent: false, read: true },
      { id: "1f", text: "Oh yes! I've been wanting to try it!", timestamp: "15:05", sent: true, read: true },
      { id: "1g", text: "Great! I'll make a reservation for 7pm", timestamp: "15:10", sent: false, read: true },
      { id: "1h", text: "That's good! Can't wait 😊", timestamp: "16:10", sent: true, read: true },
      { id: "1i", text: "Me neither! See you then 🥰", timestamp: "16:14", sent: false, read: true },
    ],
  },
  {
    id: "2",
    name: "Mom 💕",
    avatar: generateAvatarSvg("Mom", 1),
    lastMessage: "We all make mistakes in life",
    lastMessageTime: "19:45",
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    hasMention: true,
    isTyping: false,
    lastMessageSent: false,
    lastMessageRead: false,
    isDeleted: false,
    online: true,
    phone: "+1 (555) 234-5678",
    about: "Proud mom 💕",
    messages: [
      { id: "2a", text: "Hi sweetie, how was school today?", timestamp: "17:00", sent: false, read: true },
      { id: "2b", text: "It was okay mom, thanks for asking", timestamp: "17:15", sent: true, read: true },
      { id: "2c", text: "Did you eat properly? Don't skip meals!", timestamp: "17:20", sent: false, read: true },
      { id: "2d", text: "Yes mom, I had a big lunch 😅", timestamp: "17:30", sent: true, read: true },
      { id: "2e", text: "Good! Remember to call your grandmother this weekend", timestamp: "18:00", sent: false, read: true },
      { id: "2f", text: "I forgot to submit my assignment on time 😬", timestamp: "19:00", sent: true, read: true },
      { id: "2g", text: "We all make mistakes in life", timestamp: "19:45", sent: false },
    ],
  },
  {
    id: "3",
    name: "Daddy",
    avatar: generateAvatarSvg("Daddy", 2),
    lastMessage: "I mean he wrecked it! 🤣",
    lastMessageTime: "19:42",
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    hasMention: false,
    isTyping: false,
    lastMessageSent: false,
    lastMessageRead: true,
    isDeleted: false,
    online: false,
    phone: "+1 (555) 345-6789",
    about: "Sports fan 🏈",
    messages: [
      { id: "3a", text: "Son, did you see the game last night?", timestamp: "18:00", sent: false, read: true },
      { id: "3b", text: "No, I missed it! What happened?", timestamp: "18:10", sent: true, read: true },
      { id: "3c", text: "Johnson scored 3 goals in the first half!", timestamp: "18:15", sent: false, read: true },
      { id: "3d", text: "Whoa! That's insane!", timestamp: "18:20", sent: true, read: true },
      { id: "3e", text: "I mean he wrecked it! 🤣", timestamp: "19:42", sent: false, read: true },
    ],
  },
  {
    id: "4",
    name: "Biff Tannen",
    avatar: generateAvatarSvg("Biff Tannen", 3),
    lastMessage: "Say hi to your mom for me.",
    lastMessageTime: "18:23",
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    hasMention: false,
    isTyping: false,
    lastMessageSent: false,
    lastMessageRead: true,
    isDeleted: false,
    online: false,
    phone: "+1 (555) 456-7890",
    about: "Make like a tree and leave",
    messages: [
      { id: "4a", text: "Hey McFly!", timestamp: "17:00", sent: false, read: true },
      { id: "4b", text: "What do you want, Biff?", timestamp: "17:05", sent: true, read: true },
      { id: "4c", text: "I need you to do my homework", timestamp: "17:10", sent: false, read: true },
      { id: "4d", text: "Do your own homework, Biff.", timestamp: "17:15", sent: true, read: true },
      { id: "4e", text: "Say hi to your mom for me.", timestamp: "18:23", sent: false, read: true },
    ],
  },
  {
    id: "5",
    name: "Clocktower Lady",
    avatar: generateAvatarSvg("Clocktower Lady", 4),
    lastMessage: "Save the clock tower?",
    lastMessageTime: "16:15",
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    hasMention: false,
    isTyping: false,
    lastMessageSent: false,
    lastMessageRead: true,
    isDeleted: false,
    online: false,
    phone: "+1 (555) 567-8901",
    about: "Save the clock tower! 🕐",
    messages: [
      { id: "5a", text: "Excuse me, young man!", timestamp: "15:30", sent: false, read: true },
      { id: "5b", text: "Yes?", timestamp: "15:35", sent: true, read: true },
      {
        id: "5poll",
        text: "",
        timestamp: "15:40",
        sent: false,
        read: true,
        type: "poll",
        poll: {
          question: "Save the clock tower?",
          options: [
            { text: "Yes", votes: 42, voted: true },
            { text: "No", votes: 3, voted: false },
          ],
        },
      },
      { id: "5c", text: "Would you like to contribute to the preservation of the clock tower?", timestamp: "15:45", sent: false, read: true },
      { id: "5d", text: "Oh, I don't think I have any cash on me...", timestamp: "16:00", sent: true, read: true },
      { id: "5e", text: "Save the clock tower?", timestamp: "16:15", sent: false, read: true },
    ],
  },
  {
    id: "6",
    name: "Mr. Strickland",
    avatar: generateAvatarSvg("Mr Strickland", 5),
    lastMessage: "You deleted this message.",
    lastMessageTime: "08:57",
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    hasMention: false,
    isTyping: false,
    lastMessageSent: true,
    lastMessageRead: false,
    isDeleted: true,
    online: false,
    phone: "+1 (555) 678-9012",
    about: "No slackers!",
    messages: [
      { id: "6sys", text: "Disappearing messages were turned on", timestamp: "07:55", sent: false, read: true, type: "system" },
      { id: "6a", text: "McFly, you're late again!", timestamp: "08:00", sent: false, read: true },
      { id: "6b", text: "Sorry Mr. Strickland, it won't happen again", timestamp: "08:10", sent: true, read: true },
      { id: "6c", text: "That's what you said last time, slacker!", timestamp: "08:15", sent: false, read: true },
      { id: "6d", text: "I'm not a slacker!", timestamp: "08:30", sent: true, read: true },
      { id: "6del", text: "This message was deleted", timestamp: "08:40", sent: true, read: true, type: "deleted" },
      { id: "6e", text: "Your father was a slacker too!", timestamp: "08:45", sent: false, read: true },
    ],
  },
  {
    id: "7",
    name: "Emmett \"Doc\" Brown",
    avatar: generateAvatarSvg("Doc Brown", 6),
    lastMessage: "Great Scott! The flux capacitor!",
    lastMessageTime: "Yesterday",
    unreadCount: 3,
    isPinned: false,
    isMuted: false,
    hasMention: false,
    isTyping: false,
    lastMessageSent: false,
    lastMessageRead: false,
    isDeleted: false,
    online: true,
    phone: "+1 (555) 789-0123",
    about: "1.21 Gigawatts!",
    messages: [
      { id: "7a", text: "Marty! You've got to come back with me!", timestamp: "22:00", sent: false, read: true },
      { id: "7b", text: "Where are we going, Doc?", timestamp: "22:05", sent: true, read: true },
      {
        id: "7link",
        text: "",
        timestamp: "22:08",
        sent: false,
        read: true,
        type: "link",
        link: {
          url: "https://open.spotify.com/track/example",
          title: "Back In Time - Huey Lewis & The News",
          description: "Listen on Spotify · Song · 1985",
          domain: "open.spotify.com",
        },
      },
      { id: "7c", text: "Back to the future!", timestamp: "22:10", sent: false, read: true },
      { id: "7d", text: "Wait, what? Is everything okay?", timestamp: "22:15", sent: true, read: true },
      { id: "7e", text: "Great Scott! The flux capacitor!", timestamp: "22:20", sent: false },
    ],
  },
  {
    id: "8",
    name: "Dave",
    avatar: generateAvatarSvg("Dave", 0),
    lastMessage: "Thanks bro!",
    lastMessageTime: "08:01",
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    hasMention: false,
    isTyping: false,
    lastMessageSent: false,
    lastMessageRead: true,
    isDeleted: false,
    online: false,
    phone: "+1 (555) 890-1234",
    about: "Hey there! I am using WhatsApp",
    messages: [
      { id: "8a", text: "Hey bro, can you pick me up?", timestamp: "07:30", sent: false, read: true },
      { id: "8b", text: "Sure, where are you?", timestamp: "07:35", sent: true, read: true },
      { id: "8c", text: "At the mall. Near the entrance", timestamp: "07:40", sent: false, read: true },
      { id: "8d", text: "On my way!", timestamp: "07:45", sent: true, read: true },
      { id: "8e", text: "Thanks bro!", timestamp: "08:01", sent: false, read: true },
    ],
  },
  {
    id: "9",
    name: "Lynda",
    avatar: generateAvatarSvg("Lynda", 1),
    lastMessage: "See you tomorrow!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    hasMention: false,
    isTyping: false,
    lastMessageSent: true,
    lastMessageRead: true,
    isDeleted: false,
    online: false,
    phone: "+1 (555) 901-2345",
    about: "Busy",
    messages: [
      { id: "9a", text: "Hey Lynda!", timestamp: "18:00", sent: true, read: true },
      { id: "9b", text: "Hi! What's up?", timestamp: "18:10", sent: false, read: true },
      { id: "9c", text: "Want to grab coffee tomorrow?", timestamp: "18:15", sent: true, read: true },
      { id: "9d", text: "Sure! What time?", timestamp: "18:20", sent: false, read: true },
      { id: "9e", text: "See you tomorrow!", timestamp: "18:30", sent: true, read: true },
    ],
  },
];
