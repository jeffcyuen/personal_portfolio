
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Linkedin, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { Resume } from './components/Resume';

const PROFILE_IMAGE_URL = "https://i.imgur.com/rXgLMhH.jpeg";

// --- Types & Data ---

interface ProjectDetails {
  tldr: string;
  context: string[];
  inputsTools: string[];
  outputsOutcome: string[];
  nextIteration: string[];
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: ProjectDetails;
  imageUrl?: string;
  imageCaption?: string;
}

const PROJECTS: Record<string, Project> = {
  "fundraising": {
    id: "fundraising",
    title: "Fundraising Ops",
    subtitle: "Capital Strategy | Investor Relations",
    imageUrl: "https://i.imgur.com/HUsQXv0.png",
    imageCaption: "Central repository of artifacts and resources to support fundraising efforts",
    description: "**Owned behind the scenes sausage making for fundraising efforts**, from investor pipelines, participating in pitches with VCs and alternative capital, creating decks and memos, and handling day-to-day asks, allowing Founder to stay focused on closing.",
    details: {
        tldr: "Managed end-to-end fundraising operations and due diligence, enabling the CEO to focus purely on investor relationships and closing.",
        context: [
            "The company needed to raise a Series A in a tightening venture market.", 
            "The process required rigorous data preparation, narrative shaping, and rapid response to investor queries."
        ],
        inputsTools: [
            "Pitch Deck", 
            "Notion (Data Room)", 
            "Airtable (CRM)", 
            "Excel (Financial Models)", 
            "Carta"
        ],
        outputsOutcome: [
            "Successfully organized over 50+ investor conversations.", 
            "Maintained a comprehensive data room with 100+ documents.", 
            "Supported the closing of the round."
        ],
        nextIteration: [
            "Implementing automated nurturing sequences for warm investor leads to maintain relationships between rounds."
        ]
    }
  },
  "okrs": {
    id: "okrs",
    title: "End-to-End OKRs",
    subtitle: "CEO Agenda Translation | Org Alignment",
    imageUrl: "https://i.imgur.com/LXmwL6T.png",
    imageCaption: "Company roadmap and source of truth for the year",
    description: "**Built and launched startup's inaugural OKR process**, a crucial North Star for aligning a lean team against mission critical milestones. Instituted QBRs to track progress towards OKRs and to ask tough questions to collaboratively brainstorm ways to **course correct back to 'Green'**.",
    details: {
        tldr: "Built inaugural OKR and roadmapping exercise on mission critical milestones across the Company to drive alignment and accountability.",
        context: [
            "Onboarding doesn’t really exist at early stage.", 
            "Knew the best way to learn was to deeply understand what everyone was working on.", 
            "Synthesized conversations and created the roadmap along the way."
        ],
        inputsTools: [
            "Coffee chats and working sessions with team members, asking a lot of new-hire questions.",
            "Google Sheets to capture roadmap.", 
            "Google Slide for QBRs."
        ],
        outputsOutcome: [
            "Solidification of most mission critical OKRs to align entire org around.", 
            "Synthesized view of ongoing and planned work, status, OKR owner, and timeline.",
            "Roadmap was basis for QBR discussions and have honest conversations for On Track or Off Track."
        ],
        nextIteration: [
            "Deeper integration with project management tools (Jira/Linear) to link daily tasks directly to quarterly objectives.",
            "Build in processes to revisit OKRs and if certain ones remain relevant (things can change daily in early-stage)."
        ]
    }
  },
  "sales-enablement": {
    id: "sales-enablement",
    title: "Full-Funnel Sales Enablement",
    subtitle: "ICP DEFINITION | SALES NARRATIVE",
    imageUrl: "https://i.imgur.com/5d0klf9.png",
    imageCaption: "Product Overview as part of Proposal Decks",
    description: "**Developed full portfolio of Sales artifacts** including enriched ICP lead lists, product overview decks, case studies, pricing / ROI calculators and standard contracts. **Walked the walk by driving sales from demo to close, helping close first Sales for SaaS business.**",
    details: {
        tldr: "Built up the full-stack (Top Funnel —> Bottom Funnel) of Sales Enablement Tools from scratch for our Product; walked the walk and used tools to close first Contracts.",
        context: [
            "We needed to rapidly build up our GTM and Sales motion after we pivoted to make our internally developed tool commercially available as a SaaS product."
        ],
        inputsTools: [
            "Internal outcomes data and external benchmarking to build messaging.",  
            "Google Slides and Slides to build decks, one-pagers, and ROI calculators", 
            "GPT to build initial Contract templates"
        ],
        outputsOutcome: [
            "First B2B sales generated for SaaS business",
            "Full-stack of collateral ready to move Prospects along funnel",
        ],
        nextIteration: [
            "Use AI to bring some of the collateral (e.g. proposals, ROI calculators) to life via various microsites"
        ]
    }
  },
  "partnerships": {
    id: "partnerships",
    title: "Partnership Revenue Unlocks",
    subtitle: "NEW REVENUE STREAMS | STRATEGIC PARTNERSHIPS",
    imageUrl: "https://i.imgur.com/6Klsz0o.png",
    imageCaption: "Trading terms with Strategic Partner to unlock new revenue",
    description: "**Originated, sourced, and closed strategic partnerships to grow the business.** Led forecasting and scenario analysis efforts to optimize commercial terms for the contract. Immediately leveraged partnership to **unlock $1M+ of net new CARR.**",
    details: {
        tldr: "Identified strategic revenue opportunity; traded terms and landed the partnership, unlocked $1.3M+ in net new contracted ARR with average time to close of 16 days.",
        context: [
            "We recognized a huge potential for our ICPs to materially grow high-margin revenue by launching a new service line.",
            "Unfortunately service line is gated unless provider holds a specific license.",
            "Landed strategic partnership to sublicense, allowing us to blitz ICPs with our new offering."
        ],
        inputsTools: [
            "GPT to deep dive on CMS documentation and learn ins and outs of new program",
            "Google Sheets to forecast revenue potential and scenario planning for key commercial terms",
            "GPT to generate contract template and framework of key terms."
        ],
        outputsOutcome: [
            "Landed partnerships that immediately became cash flow positive given power of license.",
            "Closed ~$1.3M in net new CARR for 2026.",
            "16 day average time to close."
        ],
        nextIteration: [
            "While we needed to move fast, ideally would have opened procurement process further to have more optionality. Most ideal would have been able to directly obtain license from CMS."
        ]
    }
  },
  "prototyping": {
    id: "prototyping",
    title: "Rapid MVP Prototyping",
    subtitle: "PRODUCT STRATEGY | VIBE-CODING",
    imageUrl: "https://i.imgur.com/6MYdPYE.png",
    imageCaption: "Vibe coding from idea to prototype in Lovable in ~48 hours.",
    description: "**Vibe-coded earliest prototypes of SaaS platform** used to close propsective customers, fundraising pitches with Investors, and as sandbox for new features. **Translated MVP scaffolding into detailed PRDs to 3x Eng shipping speed.**",
    details: {
        tldr: "Built out SaaS prototype used to close prospective customers and 3x Engineering speed of eventual MVP build.",
        context: [
            "We turned our internal tool into a SaaS product and needed a prototype that would be 1) used in Sales / Fundraising efforts and 2) serve as a wireframe to pass to outsourced Eng team to develop."
        ],
        inputsTools: [
            "Figma to outline key pages and functionality.",
            "Lovable to physically build out the pages and features.",
            "GPT to transform code into detailed discrete PRDs for Eng."
        ],
        outputsOutcome: [
            "Fully functional prototype Demo environment used to close first contracts.",
            "Accelerated Eng shipping speed 3x by more easily visualizing requirements."
        ],
        nextIteration: [
            "This was super successful so would have jumped to this sooner. With wealth of time, I would like to explore building this with Claude Code and build my more technical skillset."
        ]
    }
  },
  "adoption": {
    id: "adoption",
    title: "Accelerating Product Adoption",
    subtitle: "A/B TESTING | Cross-Functional Collaboration",
    imageUrl: "https://i.imgur.com/W5iMZPA.png",
    imageCaption: "Bingo style game to accelerate Product/Workflow adoption.",
    description: "**Ideated and piloted novel gamification methods to help accelerate Provider onboarding** onto platform and integration in day-to-day workflows. Built initial prototypes and ran manual A/B experiments that showed **pilot was wildly successful and was eventually productized.**",
    details: {
        tldr: "Felt conviction in new gamification method and manually built and piloted a new Product feature that accelerated Product adoption by 4x before ultimately being built as a core feature.",
        context: [
            "Provider-facing Products only work if they are deeply entrenched in workflows but it was taking too long to get buy-in from Providers to use the Product, putting accounts at risk.",
            "I ideated a Bingo-style board that sat on the Product homepage that helped users onboard onto Product by doing, going into each of the modules the Product had on offer.", 
        ],
        inputsTools: [
            "User research from provider groups on workflows and the value of the Product.",
            "Gamification principles to develop fun and interactive ways to engage with the Product.",
            "Looker to pull data and A/B test feature effectiveness."
        ],
        outputsOutcome: [
            "Pilot accelerated Product adoption by 4x, measured by Product use within 7 days of onboarding.",
            "Influenced Product roadmap as feature was eventually built in the Product.",
            "Led to me building Ops playbooks for how to deploy the feature, becoming an onboarding SOP."
        ],
        nextIteration: [
            "Manually building and testing this was a huge pain. With the power of AI, I would have definitely made a microsite to test the feature and monitor engagement in real time."
        ]
    }
  },
  "financial-model": {
    id: "financial-model",
    title: "Financial Forecast Model",
    subtitle: "GROWTH LEVERS | UNIT ECONOMICS",
    imageUrl: "https://i.imgur.com/pp0ylxR.png",
    imageCaption: "Summary tab from forecast model outlining scale needed for at various revenue targets.",
    description: "**Built and owned financial modeling and forecasting** used for quarterly target setting and various financial due diligence as part of fundraising capital. Developed org understanding of unit economics and perspective on margin requirements, translating into pricing strategy and pipeline targets.",
    details: {
        tldr: "I architected, built, and maintained financial models used for Growth / Sales Target Setting, Financial Due Diligence, and hiring plans",
        context: [
            "We were evolving from a healthcare services business into a SaaS and provider enablement company and needed a financial model to guide the transition.",
            "I took took ownership of the model as our outsourced CFO team had a traditional healthcare services background and weren't in the weeds enough to understand the financial storytelling."
        ],
        inputsTools: [
            "Hubspot for historical pipeline data.",
            "Ramp and NetSuite for historical expense data.",
            "GPT to translate financial model concepts and mechanics into formulas.",
            "Sheets to put it all together."
        ],
        outputsOutcome: [
            "Full 3 year forecast model outlining Revenue, COGs, Margin, Profit etc.",
            "Specific builds for each product line and their respective ACVs, sales cycles, and economics; OpEx and headcount assumptions that scale with company.",
            "Tangible goals for Growth team on qualified leads, demos, etc to meet Revenue goals."
        ],
        nextIteration: [
            "Would want to explore more AI-native ERP systems as we were stuck in NetSuite. Depending on how much Finance is in my immediate scope, would want to explore more specific FP&A tools to automate more."
        ]
    }
  },
  "cash-flow": {
    id: "cash-flow",
    title: "Cash Flow Modelling",
    subtitle: "BURN MANAGEMENT | RUNWAY PLANNING",
    imageUrl: "https://i.imgur.com/oe9cv06.png",
    imageCaption: "Daily cash balance model output",
    description: "**Built and owned company cash flow model that informed overall company operations** (e.g. hiring, rev cycle, expense management). Provided CEO visibility for daily estimates of cash balance based on history company inflows (e.g. revenue + receivables) and outflows (e.g. payroll, vendor expenses, various debt vehicles).",
    details: {
        tldr: "Cash is king and cash burn / runway management is critical to success so I built a daily cash flow and cash balance model, predicting cash balance with 90%-95% accuracy.",
        context: [
            "Healthcare cash flow is extremely complex, with each service type and payer having their own policies and procedures on how they will pay and most importantly when.",
            "With receivables routinely aging 90+ days, it was really important to understand cash implications of various decisions over timeTight runway required precise timing of payables and receivables."
        ],
        inputsTools: [
            "Claims reports and SaaS invoices to predict timing of revenue —> cash.",
            "Ramp to understand monthly OpEx and timing of outflows.",
            "Payroll reports to understand fully-loaded payroll costs.",
            "GPT to amortize debt schedules.",
            "Sheets to put it all together."
        ],
        outputsOutcome: [
            "Cash flow model that predicted cash balance on a daily (potentially overkill) basis with 90%-95% accuracy.",
            "Deep dive of OpEx that allowed us to cut unneeded SaaS, manage Contractor spend, and inform hiring plans."
            
        ],
        nextIteration: [
            "Build in more scenario planning for key inputs / assumptions (e.g. time to collect, revenue forecasts).",
            "Use AI to build it into a more solid tool / microsite that allows broader leadership team to understand and adjust assumptions."
        ]
    }
  },
  "onboarding": {
    id: "onboarding",
    title: "Customer Onboarding Engine",
    subtitle: "STANDARDIZATION | OPS SCALING",
    imageUrl: "https://i.imgur.com/gDxSpsE.png",
    imageCaption: "Notion board outlining implementation tickets and steps",
    description: "Led the first onboardings for new customers before standardizing process to help **reduce onboarding time and human capital needed by ~30%.** Built initial onboarding ticketing system for new Customer across service lines, providing org with consolidated view of new Customer onboarding.",
    details: {
        tldr: "I built a standardized onboarding process for our services lines to improve efficiencies as we began to handle multiple concurrent onboardings.",
        context: [
            "Growth meant that we were onboarding > 1 customer at any given time and needed to develop a more scalable process.",
            "Built up a basic checklist for onboarding customers and a Notion onboarding ticketing system for our team."
        ],
        inputsTools: [
            "Sheets to develop data specs and share with Customers.",
            "Google Drive to simplify, manage, and share data with Customers.",
            "Notion to develop the onboarding ticket system."
        ],
        outputsOutcome: [
            "Standardized onboarding process that reduced time to onboard by ~30%.",
            "Accessible centralized database of all onboarding customers by status."
        ],
        nextIteration: [
            "Our onboarding process was fairly light - for more robust processes I would look to use a more dedicated tool (e.g. Linear, Asana, etc.)",
            "Building more automations to reduce human time spent even more (e.g. integrating and automating via Slack)."
        ]
    }
  },
  "service-line": {
    id: "service-line",
    title: "New Service Line Build",
    subtitle: "REVENUE MAXIMIZATION | AUTOMATED REPORTING",
    imageUrl: "https://i.imgur.com/9fGsM3d.png",
    imageCaption: "Automated reporting showing overall program health",
    description: "Helped land payer contracts and build up new service line, built up processes to maximize revenue, **growing program to ~1M in annualized revenue in 10 months.**Designed automated dashboarding to help care teams optimize towards patient outcomes and maximize realization of contracted revenue.",
    details: {
        tldr: "I helped launch a new service line by closing first payer contracts, hiring the team, and optimizing operations to hit ~1M in annualized revenue in 10 months.",
        context: [
            "To diversity revenue streams and unlock more revenue potential as a business, we launched a new service line focused on high-acuity Medicaid patients.",
            "Helped build service line from 0 —> 1 by landing first payer contracts, hiring on-the-ground teams, and managing data & reporting."
        ],
        inputsTools: [
            "Deep dive in economics of payer contracts (they can vary wildly) to develop strategies to maximize revenue.",
            "EMR to export clinical and encounter data.",
            "Sheets and Apps Scripts to build automated dashboards."
        ],
        outputsOutcome: [
            "New service line scaled to ~1M in annualized revenue in 10 months.",
            "Automated dashboard that is geared towards maximizing MRR (i.e., engagement targets, method of outreach, patient-facing time per patient)."
        ],
        nextIteration: [
            "Felt limitations from our EMR, would choose a more flexible and AI-native EMR that would let us control our data more.",
            "Spending more time with on-the-ground team members (especially early hires) on the economics behind the programs for change management."
        ]
    }
  }
};

// ---------------------------

const ExperienceCard = ({ project, delay, onReadMore }: { project: Project, delay: string, onReadMore: (p: Project) => void }) => {
  // Helper to render bold text from **markers**
  const renderWithBold = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
       if (part.startsWith('**') && part.endsWith('**')) {
         return <strong key={i} className="font-bold text-stone-900">{part.slice(2, -2)}</strong>;
       }
       return part;
    });
  };

  return (
    <div className="flex flex-col md:flex-row group animate-fade-in-up bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full hover:border-nobel-gold/50 overflow-hidden" style={{ animationDelay: delay }}>
      <div className="flex-1 p-8 flex flex-col justify-between order-2 md:order-1">
        <div>
          <h3 className="font-sans text-2xl font-semibold text-stone-900 mb-1">{project.title}</h3>
          <div className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-4 leading-relaxed">{project.subtitle}</div>
          <div className="w-12 h-0.5 bg-nobel-gold mb-6 opacity-60"></div>
          <p className="text-stone-600 text-lg leading-relaxed mb-8">
             {renderWithBold(project.description)}
          </p>
        </div>
        <button 
          onClick={() => onReadMore(project)}
          className="mt-2 w-fit flex items-center gap-3 px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-nobel-gold transition-all shadow-md text-xs font-bold uppercase tracking-widest group-hover:shadow-lg"
        >
          Deep Dive <ArrowRight size={14} />
        </button>
      </div>
      <div className="w-full md:w-1/2 min-h-[300px] md:min-h-full bg-stone-100 order-1 md:order-2 relative overflow-hidden p-6 flex flex-col items-center justify-center">
          <div className="relative flex-1 w-full flex items-center justify-center min-h-0">
             <img 
                src={project.imageUrl || `https://placehold.co/800x800/f5f5f4/c7c5bf?text=${encodeURIComponent(project.title)}`}
                alt={project.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="mt-4 text-[10px] tracking-widest text-stone-600 text-center">
            {project.imageCaption || "Project Artifact"}
          </div>
      </div>
    </div>
  );
};

const NavBar = ({ 
  scrolled, 
  menuOpen, 
  setMenuOpen, 
  onNavigate, 
  onResume,
  showBack = false,
  onBack
}: {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  onNavigate: (id: string) => void;
  onResume: () => void;
  showBack?: boolean;
  onBack?: () => void;
}) => {
    return (
      <>
      <nav className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => showBack && onBack ? onBack() : onNavigate('top')}>
            {showBack ? (
                 <div className="flex items-center gap-3 text-stone-900 group">
                    <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover:border-nobel-gold group-hover:bg-nobel-gold group-hover:text-white transition-all shadow-sm">
                        <ArrowLeft size={14} />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-widest text-stone-500 group-hover:text-stone-900 transition-colors">Back</span>
                 </div>
            ) : (
                <span className="font-sans font-bold text-xl tracking-tight text-stone-900">
                    Jeff Yuen
                </span>
            )}
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold tracking-[0.15em] text-stone-600">
            <button onClick={() => onNavigate('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</button>
            <button onClick={() => onNavigate('ceo-office')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Office of the CEO</button>
            <button onClick={() => onNavigate('growth')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Growth / GTM</button>
            <button onClick={() => onNavigate('product')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Product</button>
            <button onClick={() => onNavigate('fpa')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">FP&A</button>
            <button onClick={() => onNavigate('ops')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Ops</button>
            <button onClick={() => onNavigate('everything-else')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Everything Else</button>
            <button onClick={onResume} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Resume</button>
          </div>

          <button className="lg:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[120] bg-[#F9F8F4] flex flex-col items-center justify-center gap-6 text-sm font-bold tracking-widest animate-fade-in">
             <button className="absolute top-6 right-6 p-2 text-stone-900" onClick={() => setMenuOpen(false)}>
                <X />
             </button>
            {showBack && onBack && (
                <button onClick={() => { setMenuOpen(false); onBack(); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Portfolio
                </button>
            )}
            <button onClick={() => { setMenuOpen(false); onNavigate('about'); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('ceo-office'); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Office of the CEO</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('growth'); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Growth / GTM</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('product'); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Product</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('fpa'); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">FP&A</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('ops'); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Ops</button>
            <button onClick={() => { setMenuOpen(false); onNavigate('everything-else'); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Everything Else</button>
            <button onClick={() => { setMenuOpen(false); onResume(); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Resume</button>
        </div>
      )}
      </>
    );
}

const ProjectDetail = ({ 
    project, 
    onBack, 
    onNavigate,
    onResume 
}: { 
    project: Project, 
    onBack: () => void,
    onNavigate: (id: string) => void,
    onResume: () => void
}) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const el = document.getElementById('project-detail-scroll');
        if (el) {
            el.scrollTop = 0;
            const handleScroll = () => setScrolled(el.scrollTop > 50);
            el.addEventListener('scroll', handleScroll);
            return () => el.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const renderList = (items: string[], textColorClass = "text-stone-600") => (
        <ul className={`list-disc list-outside ml-5 space-y-2 ${textColorClass}`}>
            {items.map((item, i) => (
                <li key={i} className="leading-relaxed pl-1">{item}</li>
            ))}
        </ul>
    );

    return (
        <div id="project-detail-scroll" className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fade-in">
             
             <NavBar 
                scrolled={scrolled}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onNavigate={(id) => {
                    // If navigating to a section, close project view first
                    onNavigate(id);
                }}
                onResume={onResume}
                showBack={true}
                onBack={onBack}
             />

            <div className="container mx-auto px-6 py-10 pt-32 max-w-4xl">
                <header className="mb-10">
                    <div className="text-xs font-bold text-nobel-gold uppercase tracking-[0.2em] mb-4">{project.subtitle}</div>
                    <h1 className="font-sans text-4xl md:text-5xl font-bold text-stone-900 mb-8 leading-tight">{project.title}</h1>
                    <div className="w-24 h-1 bg-nobel-gold"></div>
                </header>

                <div className="mb-10 flex flex-col items-center">
                     <img 
                        src={project.imageUrl || `https://placehold.co/1200x800/f5f5f4/c7c5bf?text=${encodeURIComponent(project.title)}`}
                        alt={project.title}
                        className="w-auto h-auto max-w-full max-h-[300px] object-contain border border-stone-900"
                    />
                    <div className="mt-4 text-[10px] tracking-widest text-stone-600 text-center">
                        {project.imageCaption || "Project Artifact"}
                    </div>
                </div>

                <div className="space-y-10">
                    <section>
                        <h3 className="font-sans text-xl font-bold text-stone-900 mb-4 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-nobel-gold"></span> TL;DR
                        </h3>
                        <p className="text-lg text-stone-700 leading-relaxed pl-5 border-l-2 border-stone-300">{project.details.tldr}</p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <section>
                            <h3 className="font-sans text-lg font-bold text-stone-900 mb-4 uppercase tracking-wider text-sm">Context</h3>
                            {renderList(project.details.context)}
                        </section>
                        
                        <section>
                             <h3 className="font-sans text-lg font-bold text-stone-900 mb-4 uppercase tracking-wider text-sm">Inputs / Tools</h3>
                             {renderList(project.details.inputsTools)}
                        </section>
                    </div>

                    <section className="bg-stone-50 p-8 rounded-xl border border-stone-100">
                        <h3 className="font-sans text-lg font-bold text-stone-900 mb-4 uppercase tracking-wider text-sm">Outputs / Outcome</h3>
                        {renderList(project.details.outputsOutcome, "text-stone-700 font-medium")}
                    </section>

                    <section>
                        <h3 className="font-sans text-lg font-bold text-stone-900 mb-4 uppercase tracking-wider text-sm">Next Iteration</h3>
                        {renderList(project.details.nextIteration)}
                    </section>
                </div>
                
                <div className="mt-12 pt-10 border-t border-stone-200 flex justify-center">
                     <button 
                        onClick={onBack}
                        className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-lg font-bold tracking-wider text-sm"
                    >
                        BACK TO PORTFOLIO
                    </button>
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'resume' | 'project'>('home');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when resume/project is open
  useEffect(() => {
    if (view !== 'home') {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [view]);

  const handleReadMore = (project: Project) => {
      setActiveProject(project);
      setView('project');
  };

  const handleNavigate = (id: string) => {
    if (view !== 'home') {
        setView('home');
        // Small timeout to allow overlay to close before scrolling
        setTimeout(() => {
            if (id === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }, 100);
    } else {
        setMenuOpen(false);
        if (id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
        }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white font-sans">
      
      <NavBar 
        scrolled={scrolled} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        onNavigate={handleNavigate} 
        onResume={() => setView('resume')} 
      />

      {/* Hero Section */}
      <header className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-white/50 pt-20 pb-10">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,rgba(249,248,244,0.4)_60%,rgba(249,248,244,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="font-sans text-6xl md:text-8xl lg:text-9xl font-bold leading-wide mb-4 text-stone-900 drop-shadow-sm">
            Jeff Yuen 
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-normal leading-relaxed mb-6">
            Early-Stage Enthusiast 
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
              <a href="tel:734-678-7768" className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200 hover:border-nobel-gold transition-all duration-300 shadow-sm group">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
                      <Phone size={14} />
                  </div>
                  <div className="text-left">
                      <div className="text-[11px] font-bold text-stone-900 uppercase tracking-widest">734-678-7768</div>
                  </div>
              </a>
              <a href="mailto:jeffchengyuen@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200 hover:border-nobel-gold transition-all duration-300 shadow-sm group">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
                      <Mail size={14} />
                  </div>
                  <div className="text-left">
                      <div className="text-[10px] font-bold text-stone-900 tracking-widest">jeffchengyuen@gmail.com</div>
                  </div>
              </a>
              <a href="https://www.linkedin.com/in/jcyuen/" target="_blank" rel="noopener" className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200 hover:border-nobel-gold transition-all duration-300 shadow-sm group">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
                      <Linkedin size={14} />
                  </div>
                  <div className="text-left">
                      <div className="text-[11px] font-bold text-stone-900 tracking-widest">LinkedIn</div>
                  </div>
              </a>
              <button 
                onClick={() => setView('resume')}
                className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200 hover:border-nobel-gold transition-all duration-300 shadow-sm group"
              >
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
                      <FileText size={14} />
                  </div>
                  <div className="text-left">
                      <div className="text-[11px] font-bold text-stone-900 tracking-widest">Resume</div>
                  </div>
              </button>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction / About */}
        <section id="about" className="pt-10 pb-12 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            {/* Header spanning full width */}
            <div className="mb-8">
              <div className="inline-block mb-3 text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase">About Me</div>
              <h2 className="font-sans text-4xl md:text-5xl font-bold mb-8 leading-tight text-stone-900">Hello 👋 - I'm Jeff</h2>
              <div className="w-24 h-1 bg-nobel-gold"></div>
            </div>

            {/* Content grid with vertical alignment */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-4">
                <div className="aspect-[4/5] bg-stone-50 rounded-xl overflow-hidden shadow-xl border border-stone-100 group">
                  <img 
                    src={PROFILE_IMAGE_URL}
                    alt="Jeff Yuen" 
                    className="w-full h-full object-cover grayscale-[0.2] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-4 text-xs text-stone-600 font-sans font-medium text-center">Me simultaneously in the weeds while seeing the forest for the trees</p>
              </div>
              <div className="md:col-span-8 text-xl text-stone-600 leading-relaxed space-y-6">
                <p className="font-normal">
                  I am an early-stage builder, equally energized and experienced in building up 0 → 1 systems across GTM, Product, FP&A, and Ops.
                </p>
                <p className="font-normal">
                  I love rolling up my sleeves and partnering hand-in-hand with Founders to build the first versions of what eventually scales.
                </p>
                <p className="font-normal">
                  I operate best in high-velocity, high-stakes, high-ambiguity, and high-trust environments. I hope this portfolio helps show my working style and output.
                </p>
                <p className="font-normal">
                  I am passionate about healthcare and tech and get excited about building a healthcare system that truly benefits from AI. 
                </p>
                <p className="font-normal">
                   Disclaimer: had a blast using AI tools to build this site, however all the content is in my own voice.
                </p>
                <p className="font-normal">
                   Let's Dig In!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Office of the CEO - Cream */}
        <section id="ceo-office" className="py-8 bg-[#F5F4F0] border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <h2 className="font-sans text-5xl md:text-6xl font-bold mb-2 text-stone-900">Office of the CEO</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-8 items-stretch">
                    <ExperienceCard 
                        project={PROJECTS["fundraising"]}
                        delay="0.1s"
                        onReadMore={handleReadMore}
                    />
                    <ExperienceCard 
                        project={PROJECTS["okrs"]}
                        delay="0.2s"
                        onReadMore={handleReadMore}
                    />
                </div>
            </div>
        </section>

        {/* Growth / GTM - White */}
        <section id="growth" className="py-8 bg-white overflow-hidden relative border-t border-stone-200">
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-8">
                    <h2 className="font-sans text-5xl md:text-6xl font-bold mb-2 text-stone-900">Growth / GTM</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-8 items-stretch">
                    <ExperienceCard 
                        project={PROJECTS["sales-enablement"]}
                        delay="0.1s"
                        onReadMore={handleReadMore}
                    />
                    <ExperienceCard 
                        project={PROJECTS["partnerships"]}
                        delay="0.2s"
                        onReadMore={handleReadMore}
                    />
                </div>
            </div>
        </section>

        {/* Product - Cream */}
        <section id="product" className="py-8 bg-[#F5F4F0] border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <h2 className="font-sans text-5xl md:text-6xl font-bold mb-2 text-stone-900">Product</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-8 items-stretch">
                    <ExperienceCard 
                        project={PROJECTS["prototyping"]}
                        delay="0.1s"
                        onReadMore={handleReadMore}
                    />
                    <ExperienceCard 
                        project={PROJECTS["adoption"]}
                        delay="0.2s"
                        onReadMore={handleReadMore}
                    />
                </div>
            </div>
        </section>

        {/* Financial Planning - White */}
        <section id="fpa" className="py-8 bg-white border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <h2 className="font-sans text-5xl md:text-6xl font-bold mb-2 text-stone-900">FP&A</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-8 items-stretch">
                    <ExperienceCard 
                        project={PROJECTS["financial-model"]}
                        delay="0.1s"
                        onReadMore={handleReadMore}
                    />
                    <ExperienceCard 
                        project={PROJECTS["cash-flow"]}
                        delay="0.2s"
                        onReadMore={handleReadMore}
                    />
                </div>
            </div>
        </section>

        {/* Implementation + Ops - Cream */}
        <section id="ops" className="py-8 bg-[#F5F4F0] border-t border-stone-200">
             <div className="container mx-auto px-6">
                <div className="mb-8">
                    <h2 className="font-sans text-5xl md:text-6xl font-bold mb-2 text-stone-900">Launch & Ops</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-8 items-stretch">
                    <ExperienceCard 
                        project={PROJECTS["onboarding"]}
                        delay="0.1s"
                        onReadMore={handleReadMore}
                    />
                    <ExperienceCard 
                        project={PROJECTS["service-line"]}
                        delay="0.2s"
                        onReadMore={handleReadMore}
                    />
                </div>
             </div>
        </section>

        {/* Everything Else - White */}
        <section id="everything-else" className="py-8 bg-white border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <h2 className="font-sans text-5xl md:text-6xl font-bold mb-2 text-stone-900">Everything Else</h2>
                    <div className="text-xs text-stone-500 font-bold uppercase tracking-widest mt-2 leading-relaxed">For when there's no owner and there's a chance for me to step up.</div>
                </div>
                
                <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-8 hover:shadow-md transition-all duration-300">
                     <ul className="list-disc list-outside ml-5 space-y-4 text-stone-600 text-lg leading-relaxed">
                        <li><strong className="text-stone-900">People:</strong> Supported recruiting via sourcing, conducting case studies, and closing candidates. Led onboarding processes post-hire.</li>
                        <li><strong className="text-stone-900">Compliance:</strong> Led company efforts in becoming HIPAA and SOC 2 Type II compliant and passing rigorous health plan audits.</li>
                        <li><strong className="text-stone-900">Procurement:</strong> Owned procurement processes for Contractors and Tools from sourcing, selection, contracting, and ROI oversight.</li>
                    </ul>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-500 py-12">
        <div className="container mx-auto px-6 text-center">
            <div className="text-white font-sans font-bold text-2xl mb-6">Jeff Yuen</div>
            
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <a href="tel:734-678-7768" className="flex items-center gap-3 px-6 py-3 bg-stone-800 rounded-full border border-stone-700 hover:border-nobel-gold transition-all duration-300 shadow-sm group">
                  <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-stone-500 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
                      <Phone size={14} />
                  </div>
                  <div className="text-left">
                      <div className="text-[11px] font-bold text-stone-300 uppercase tracking-widest">734-678-7768</div>
                  </div>
              </a>
              <a href="mailto:jeffchengyuen@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-stone-800 rounded-full border border-stone-700 hover:border-nobel-gold transition-all duration-300 shadow-sm group">
                  <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-stone-500 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
                      <Mail size={14} />
                  </div>
                  <div className="text-left">
                      <div className="text-[10px] font-bold text-stone-300 tracking-widest">jeffchengyuen@gmail.com</div>
                  </div>
              </a>
              <a href="https://www.linkedin.com/in/jcyuen/" target="_blank" rel="noopener" className="flex items-center gap-3 px-6 py-3 bg-stone-800 rounded-full border border-stone-700 hover:border-nobel-gold transition-all duration-300 shadow-sm group">
                  <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-stone-500 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
                      <Linkedin size={14} />
                  </div>
                  <div className="text-left">
                      <div className="text-[11px] font-bold text-stone-300 tracking-widest">LinkedIn</div>
                  </div>
              </a>
              <button 
                onClick={() => setView('resume')}
                className="flex items-center gap-3 px-6 py-3 bg-stone-800 rounded-full border border-stone-700 hover:border-nobel-gold transition-all duration-300 shadow-sm group"
              >
                  <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-stone-500 group-hover:bg-nobel-gold group-hover:text-white transition-colors">
                      <FileText size={14} />
                  </div>
                  <div className="text-left">
                      <div className="text-[11px] font-bold text-stone-300 tracking-widest">Resume</div>
                  </div>
              </button>
            </div>
        </div>
      </footer>
      
      {/* Resume Overlay */}
      {view === 'resume' && (
        <div className="fixed inset-0 z-[100] bg-white animate-fade-in">
           <Resume onBack={() => setView('home')} />
        </div>
      )}

      {/* Project Details Overlay */}
      {view === 'project' && activeProject && (
          <ProjectDetail 
            project={activeProject} 
            onBack={() => setView('home')} 
            onNavigate={handleNavigate}
            onResume={() => setView('resume')}
          />
      )}
    </div>
  );
};

export default App;
