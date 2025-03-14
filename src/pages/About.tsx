import { useState } from "react";
import {
  FaBookOpen,
  FaClipboard,
  FaClipboardCheck,
  FaTerminal,
  FaCode,
  FaEye,
} from "react-icons/fa";

const sections = [
  {
    title: "About Me",
    preview: `I'm Andrew C. Young, a web developer and cybersecurity enthusiast.

🚀 Passionate about building modern web applications and securing digital assets.  
📍 Currently studying Computer Science at UCF.  
🔐 Learning cybersecurity and CompTIA certifications.`,
    code: `{
  "name": "Andrew C. Young",
  "role": "Web Developer & Cybersecurity Enthusiast",
  "passions": [
    "Building modern web applications",
    "Securing digital assets"
  ],
  "education": "Computer Science at UCF",
  "learning": ["Cybersecurity", "CompTIA Certifications"]
}`,
  },
  {
    title: "Tech Stack",
    preview: `Frontend: React, TypeScript, Tailwind CSS, Next.js  
Backend: Node.js, Express, MongoDB  
Tools: Vite, GitHub Actions, Docker  
Cybersecurity: Linux, Networking, C, Python`,
    code: `{
  "frontend": ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  "backend": ["Node.js", "Express", "MongoDB"],
  "tools": ["Vite", "GitHub Actions", "Docker"],
  "cybersecurity": ["Linux", "Networking", "C", "Python"]
}`,
  },
  {
    title: "Contact",
    preview: `📧 Email: contact@andrewcwhy.me  
🌐 Website: [andrewcwhy.me](https://andrewcwhy.me)  
🐙 GitHub: [acy2k5](https://github.com/acy2k5)`,
    code: `{
  "email": "contact@andrewcwhy.me",
  "website": "https://andrewcwhy.me",
  "github": "https://github.com/acy2k5"
}`,
  },
];

const CopyButton = ({ text, copied, onCopy }) => (
  <button
    onClick={onCopy}
    className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
  >
    {copied ? <FaClipboardCheck className="text-green-400" /> : <FaClipboard />}
  </button>
);

const TabSwitcher = ({ activeTab, setActiveTab, index }) => (
  <div className="flex border-b border-gray-700 bg-gray-800">
    <button
      onClick={() => setActiveTab("preview")}
      className={`px-4 py-2 text-sm ${
        activeTab !== "code" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"
      } hover:text-blue-300`}
    >
      <FaEye className="inline-block mr-1" /> Preview
    </button>
    <button
      onClick={() => setActiveTab("code")}
      className={`px-4 py-2 text-sm ${
        activeTab === "code" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"
      } hover:text-blue-300`}
    >
      <FaCode className="inline-block mr-1" /> Code
    </button>
  </div>
);

const Section = ({ section, index }) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(section.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center bg-gray-800 px-3 py-1 rounded-t-md border border-gray-700 text-sm">
        <FaTerminal className="text-green-400 mr-2" />
        <span className="text-gray-300">{section.title}</span>
      </div>
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} index={index} />
      <div className="relative bg-gray-950 p-4 rounded-b-md border border-gray-700 overflow-x-auto">
        {activeTab === "code" ? (
          <pre className="text-gray-200">
            <code className="whitespace-pre-wrap">{section.code}</code>
          </pre>
        ) : (
          <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
            {section.preview}
          </div>
        )}
        {activeTab === "code" && <CopyButton text={section.code} copied={copied} onCopy={handleCopy} />}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-900 text-gray-200 p-6 rounded-lg shadow-lg font-mono">
      <div className="flex items-center space-x-2 border-b border-gray-700 pb-4 mb-4">
        <FaBookOpen className="text-green-400 text-lg" />
        <h1 className="text-lg text-gray-300">
          <a
            href="https://github.com/acy2k5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            acy2k5
          </a>
          /<span className="text-gray-400">ABOUTME.md</span>
        </h1>
      </div>
      {sections.map((section, index) => (
        <Section key={index} section={section} index={index} />
      ))}
    </div>
  );
};

export default About;
