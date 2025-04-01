import Link from "next/link";

const data = [
  {
    question: "Can I use Mustwants for my home search even if I am not a military member?",
    answer:
      "Yes! Mustwants was designed for military movers, but every home buyer searching for their next home can use our digital platform."
  },
  {
    question: "Is Mustwants only for real estate agents or veteran lenders?",
    answer:
      "No! Mustwants is available for all licensed real estate professionals. But we do focus on agents with experience with military movers as our 'Pro' agents."
  },
  {
    question: "Does Mustwants charge its users to its platform?",
    answer:
      "Mustwants is FREE for anybody looking for their next home."
  },
  {
    question: "Does Mustwants take an Agent or Lender referral fee?",
    answer:
      "No! Mustwants asks for a nominal subscription for agents/lenders but no referral or lead fee."
  },
  {
    question: "Does Mustwants sell personal data or leads?",
    answer:
      "Mustwants will NEVER sell your data or leads. We are a technology-focused platform solely focused on improving your home search experience. We are sensitive to the Security of Personal Information."
  },
  {
    question: "What region does Mustwants operate in?",
    answer: 
  
<>Mustwants is continuing to add coverage areas! See our
       { <Link
          className="!bg-mw_green site-nav_link !text-mw_black px-1.5 py-0.5 rounded-lg mx-1 hover:!bg-mw_olive transition duration-150 ease-in-out cursor-pointer text-sm"
          href="/find-a-pro/map-agents"
          target="_blank"
        >
          Agent
        </Link>}
        and
        {<Link
          className="!bg-mw_green site-nav_link !text-mw_black px-1.5 py-0.5 rounded-lg hover:!bg-mw_olive transition duration-150 ease-in-out cursor-pointer mx-1 text-sm"
          href="/find-a-pro/map-lenders"
          target="_blank"
        >
          Lender
        </Link>}
        coverage maps to learn which areas we are currently operating in.</>
    
    
  },
  {
    question: "Does Mustwants help with PCS moves?",
    answer: 
`Yes! Our platform was designed by military personnel and tailored for your next PCS move. We continue to expand coverage across the U.S. and over 180 Military Installations.`
    
  },
  {
    question: "I'm an Agent. How do I get involved?",
    answer: (
      <>
        Agents, Brokers, or Lenders can fill out this
        {<Link
          className="!bg-mw_green !text-mw_black px-1.5 py-0.5 rounded-lg mx-1 hover:!bg-mw_olive transition duration-150 ease-in-out cursor-pointer text-center text-sm"
          href="/signup"
        >
          application
        </Link>}
        to be evaluated for Mustwants.
      </>
    )
  }
];

export default data;
