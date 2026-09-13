/**
 * Hallucination Hunt - Claims Database
 * 30+ claim cards across 6 categories and 7 domains
 *
 * Categories:
 *   - Fabricated citations
 *   - Wrong statistics
 *   - Confident nonsense
 *   - Partially correct
 *   - Genuinely accurate (trust)
 *   - Unverifiable speculation
 *
 * Domains: science, history, medicine, law, technology, geography, psychology
 */

const CLAIMS = [

    /* ================================================================
       FABRICATED CITATIONS (type: "hallucination")
       ================================================================ */

    {
        id: 1,
        topic: "Medicine",
        difficulty: 1,
        text: "According to a 2023 study published in The Lancet by Dr. Rebecca Thornton of Johns Hopkins, consuming 300mg of cinnamon extract daily reduces type-2 diabetes risk by 62%. The study tracked 14,000 participants across 8 countries over 5 years.",
        type: "hallucination",
        toolResults: {
            citations: "No study matching this description exists in The Lancet's archives. A keyword search for 'Thornton cinnamon diabetes' returns zero results in medical databases.",
            facts: "While some small studies suggest cinnamon may modestly affect blood sugar, no large-scale trial has ever shown a 62% risk reduction. The claimed effect size is extraordinarily large for a dietary supplement.",
            sources: "There is no Dr. Rebecca Thornton in the Johns Hopkins endocrinology or nutrition departments. The name appears to be fabricated.",
            logic: "A 62% risk reduction from a common spice would be one of the most significant medical discoveries in decades. Such a finding would be headline news worldwide, not obscure.",
            expert: "Endocrinologists note that the largest cinnamon meta-analyses show modest effects at best. A 62% reduction would surpass most pharmaceutical interventions."
        },
        redFlags: ["Extremely specific statistics (62%, 14,000, 8 countries, 5 years)", "Named researcher who cannot be verified", "Effect size too large to be plausible for a supplement"],
        explanation: "This is a fabricated citation. The researcher, the study, and the journal publication do not exist. AI models often generate realistic-sounding but entirely fake academic references complete with specific numbers and institutional affiliations.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "In 2023, a lawyer submitted a legal brief written by ChatGPT that cited six fake court cases, complete with realistic docket numbers and judicial opinions. None of the cases existed."
    },
    {
        id: 2,
        topic: "Psychology",
        difficulty: 2,
        text: "Research by Dr. Samuel Okafor at Cambridge University, published in Nature Human Behaviour (2022), demonstrated that people who journal for 15 minutes daily show a 41% improvement in emotional regulation as measured by fMRI scans. The study (DOI: 10.1038/s41562-022-01489-2) involved 3,200 participants.",
        type: "hallucination",
        toolResults: {
            citations: "The DOI 10.1038/s41562-022-01489-2 does not resolve to any published article. Nature Human Behaviour has no record of this paper.",
            facts: "While journaling has documented mental health benefits, no single study has used fMRI on 3,200 participants. Brain imaging studies typically involve 20-100 participants due to cost.",
            sources: "Cambridge University's psychology department has no faculty member named Dr. Samuel Okafor. No publications under this name appear in Google Scholar.",
            logic: "fMRI scanning 3,200 people would cost tens of millions of dollars and require years of scanner time. This scale is implausible for a single neuroimaging study.",
            expert: "Neuroscientists flag that 'emotional regulation improvement' cannot be reduced to a single percentage from fMRI data. Brain imaging shows patterns, not simple improvement scores."
        },
        redFlags: ["Fabricated DOI number", "Implausible sample size for fMRI research", "Overly precise percentage from brain imaging"],
        explanation: "This claim includes a fabricated DOI, fake researcher, and scientifically implausible methodology. AI models sometimes generate fake DOIs that look authentic but do not resolve to any real paper.",
        frameworks: ["UNESCO: AI Techniques", "NIST: Validity & Reliability"],
        realWorldExample: "AI-generated fake citations have become so common that academic publishers now use detection tools specifically to catch fabricated references in submitted manuscripts."
    },
    {
        id: 3,
        topic: "History",
        difficulty: 2,
        text: "Historian Dr. Maria Vasquez's 2021 book 'The Hidden Archive: Lost Letters of the Founding Fathers' (Harvard University Press) reveals that Benjamin Franklin wrote a secret letter to King George III proposing a power-sharing arrangement in 1774, two years before independence.",
        type: "hallucination",
        toolResults: {
            citations: "Harvard University Press has no record of publishing this book. No title matching 'The Hidden Archive: Lost Letters of the Founding Fathers' appears in any library catalog.",
            facts: "While Franklin did communicate with British officials before independence, no secret power-sharing proposal has been documented by historians. Franklin's correspondence from this period is well-cataloged.",
            sources: "No historian named Dr. Maria Vasquez has published with Harvard University Press. This appears to be a fabricated author and publication.",
            logic: "If a secret Franklin letter to George III were discovered, it would be major historical news covered extensively in academic journals, not just a single book.",
            expert: "Colonial historians note that Franklin's 1774 activities are well-documented. He was in London attempting reconciliation through official channels, not secret correspondence."
        },
        redFlags: ["Book and author cannot be found in any catalog", "Extraordinary historical claim with no corroboration", "Specific but unverifiable details"],
        explanation: "This is a completely fabricated book, author, and historical claim. AI can generate convincing-sounding academic publications with real publishers and plausible historical narratives that never existed.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "AI chatbots have recommended non-existent books so convincingly that users have tried to order them from bookstores, only to discover they were hallucinated."
    },
    {
        id: 4,
        topic: "Science",
        difficulty: 3,
        text: "A groundbreaking paper in Physical Review Letters by Chen, Nakamura, & Williams (2023) demonstrated room-temperature superconductivity in a hydrogen-rich compound at just 2 GPa pressure, far below previous requirements. The paper (arXiv:2303.14875) has been replicated by three independent labs.",
        type: "hallucination",
        toolResults: {
            citations: "The arXiv identifier 2303.14875 does not match this paper. No Physical Review Letters publication by Chen, Nakamura, & Williams on room-temperature superconductivity exists.",
            facts: "Room-temperature superconductivity remains one of the most contested topics in physics. Claims have been made and retracted. No verified achievement at 2 GPa exists.",
            sources: "The author names are too common to verify without additional details. The combination of all three on this specific topic yields no results.",
            logic: "If room-temperature superconductivity at 2 GPa were achieved AND replicated by three labs, it would be the biggest physics breakthrough in decades and would dominate science news.",
            expert: "Physicists note that prior claims (like Dias & Salamat) were retracted amid fraud allegations. True replication by three labs would have triggered a Nobel Prize-level announcement."
        },
        redFlags: ["Fake arXiv identifier", "Claims of independent replication with no news coverage", "Breakthrough that would be worldwide headline news"],
        explanation: "This fabricates a landmark physics paper with a fake arXiv ID. The claim is designed to sound cutting-edge and plausible to someone following superconductivity research, but none of it is real.",
        frameworks: ["UNESCO: AI Techniques", "NIST: Validity & Reliability"],
        realWorldExample: "The 2023 LK-99 room-temperature superconductor claim went viral before being debunked. AI models trained on the hype may generate similar-sounding but fabricated claims."
    },
    {
        id: 5,
        topic: "Law",
        difficulty: 1,
        text: "In the landmark case Henderson v. Digital Analytics Corp (2022), the Ninth Circuit Court of Appeals ruled that AI-generated content is protected under the First Amendment. Judge Patricia Monroe wrote that 'algorithmic expression constitutes speech deserving constitutional protection.' The ruling set a precedent now followed in 23 states.",
        type: "hallucination",
        toolResults: {
            citations: "No case named Henderson v. Digital Analytics Corp exists in Ninth Circuit records or any federal court database. Westlaw and LexisNexis return zero results.",
            facts: "The legal status of AI-generated content under the First Amendment remains largely unsettled. No single ruling has been adopted by 23 states.",
            sources: "There is no Judge Patricia Monroe on the Ninth Circuit Court of Appeals. The name does not appear in federal judicial directories.",
            logic: "A ruling adopted by 23 states would be one of the most significant First Amendment developments in decades and would be widely discussed in legal scholarship.",
            expert: "Constitutional law scholars confirm that AI and the First Amendment is an active area of debate with no definitive circuit court ruling. The Copyright Office has ruled AI-generated works lack copyright protection, but First Amendment speech protections are a different question entirely."
        },
        redFlags: ["Fake case name and court ruling", "Fabricated judge name", "Claim of 23-state adoption with no supporting evidence"],
        explanation: "This is a fabricated legal case with a fake judge, fake ruling, and fake precedent. AI-generated fake case law is a well-documented problem that has already resulted in sanctions against attorneys.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Accountability"],
        realWorldExample: "In Mata v. Avianca (2023), attorney Steven Schwartz was sanctioned after ChatGPT fabricated six fake cases he cited in federal court filings."
    },
    {
        id: 6,
        topic: "Technology",
        difficulty: 3,
        text: "According to Prof. Lars Eriksson at ETH Zurich, published in IEEE Transactions on Neural Networks (2024), a new architecture called 'NeuroFold' achieves 99.2% accuracy on protein folding prediction, surpassing AlphaFold by 12 percentage points. The paper has received over 400 citations since January.",
        type: "hallucination",
        toolResults: {
            citations: "IEEE Transactions on Neural Networks has no paper on 'NeuroFold.' A search across IEEE Xplore returns zero results for this architecture name or author combination.",
            facts: "AlphaFold2 already achieves approximately 92% accuracy on CASP targets, so a 12-point improvement to 99.2% would be revolutionary. No such leap has been announced by any group.",
            sources: "ETH Zurich's computer science department has no Prof. Lars Eriksson. The name returns no publications in the protein folding or machine learning space.",
            logic: "400 citations in under a year for a paper that supposedly surpasses AlphaFold would make it the most-cited AI paper of the year and a guaranteed front-page story in every science outlet.",
            expert: "Computational biologists note that protein structure prediction improvements are incremental. A 12-point leap would require a paradigm shift that the research community would be actively discussing."
        },
        redFlags: ["Fabricated architecture name and researcher", "Implausible performance claims", "Citation count inconsistent with obscurity"],
        explanation: "This fabricates an entire research group, paper, and AI architecture. The claim uses real institutional names (ETH Zurich, IEEE) and builds on real technology (AlphaFold) to create a convincing but fake breakthrough.",
        frameworks: ["UNESCO: AI Techniques", "NIST: Validity & Reliability"],
        realWorldExample: "AI models frequently hallucinate fake machine learning architectures and benchmarks because their training data is saturated with real ML papers following similar patterns."
    },

    /* ================================================================
       WRONG STATISTICS (type: "hallucination")
       ================================================================ */

    {
        id: 7,
        topic: "Geography",
        difficulty: 1,
        text: "The Amazon Rainforest produces approximately 40% of the world's oxygen, which is why it's commonly called 'the lungs of the planet.' Deforestation threatens this critical oxygen supply for all life on Earth.",
        type: "hallucination",
        toolResults: {
            citations: "The '40% of oxygen' claim is not supported by peer-reviewed research. This is a widely repeated misconception.",
            facts: "The Amazon produces about 6-9% of the world's oxygen, but it also consumes nearly as much through decomposition. The net oxygen contribution is close to zero. Most Earth oxygen comes from ocean phytoplankton.",
            sources: "Scientists like climate researcher Jonathan Foley have publicly corrected this myth. Atmospheric scientists agree the figure is drastically overstated.",
            logic: "If one forest produced 40% of global oxygen, its sudden removal would cause an immediate, catastrophic drop in atmospheric O2 levels. The actual atmospheric oxygen reservoir is so large it would take millions of years to deplete.",
            expert: "Ecologists emphasize that the Amazon's true value lies in carbon storage and biodiversity, not net oxygen production. The 'lungs of the planet' metaphor is misleading."
        },
        redFlags: ["Commonly repeated but incorrect statistic", "Oversimplification of complex atmospheric science"],
        explanation: "The 40% figure is a popular myth that has been debunked by atmospheric scientists. The Amazon is critically important for biodiversity and carbon storage, but its net oxygen contribution is near zero. AI models often reproduce popular misconceptions because they appear frequently in training data.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "During the 2019 Amazon fires, the '20% of oxygen' claim went viral on social media (including posts by world leaders), despite being scientifically inaccurate."
    },
    {
        id: 8,
        topic: "Psychology",
        difficulty: 2,
        text: "Humans only use 10% of their brain capacity. Neuroscience research has shown that if we could unlock the remaining 90%, we would gain extraordinary cognitive abilities including enhanced memory and processing speed.",
        type: "hallucination",
        toolResults: {
            citations: "No neuroscience research supports the '10% of brain' claim. This myth has been debunked repeatedly by neurologists.",
            facts: "Brain imaging studies (PET scans, fMRI) show that virtually all areas of the brain are active, though not all simultaneously. Different regions activate for different tasks.",
            sources: "Major neuroscience organizations (Society for Neuroscience, Dana Foundation) have explicitly labeled this a myth. Neurologist Barry Gordon of Johns Hopkins has called it 'laughably false.'",
            logic: "Evolution would not maintain an organ consuming 20% of body energy if 90% were unused. Brain damage to any region causes deficits, proving all parts are functional.",
            expert: "Neurologists confirm that brain scans show activity across the entire brain over a 24-hour period. The myth likely originated from a misinterpretation of early neuroscience research on glial cells."
        },
        redFlags: ["Famous debunked myth presented as fact", "Extraordinary claim about 'unlocking' brain capacity", "No specific citations for 'neuroscience research'"],
        explanation: "The '10% of the brain' claim is one of the most persistent neuroscience myths. AI models reproduce it because it appears so frequently in popular media, books, and movies. Every part of the brain has a known function.",
        frameworks: ["UNESCO: AI Techniques", "NIST: Validity & Reliability"],
        realWorldExample: "The 2014 film 'Lucy' was built on this myth, and its popularity reinforced the misconception. AI trained on internet text absorbs such myths as if they were facts."
    },
    {
        id: 9,
        topic: "History",
        difficulty: 2,
        text: "The Great Wall of China is the only man-made structure visible from space with the naked eye. Astronauts have confirmed this on multiple occasions since the Apollo missions.",
        type: "hallucination",
        toolResults: {
            citations: "No Apollo astronaut has confirmed seeing the Great Wall from space. Multiple astronauts have explicitly stated the opposite.",
            facts: "The Great Wall is approximately 5-8 meters wide, making it far too narrow to see from orbit (400km). Highways, airports, and cities are visible, but the Wall is not.",
            sources: "Chinese astronaut Yang Liwei stated in 2003 that he could not see the Wall from space. NASA has also debunked this claim on its website.",
            logic: "The Wall is very long but very narrow. Seeing it from space would be like seeing a human hair from 2 miles away. Width, not length, determines visibility from orbit.",
            expert: "Astronauts and aerospace engineers confirm that from low Earth orbit, the Wall blends into the natural landscape. Higher orbit makes it even less visible."
        },
        redFlags: ["Famous myth presented as established fact", "Vague attribution ('astronauts have confirmed') with no specific names", "Claim contradicted by actual astronauts"],
        explanation: "This is a widespread myth that has been debunked by multiple astronauts, including Chinese astronaut Yang Liwei. The Wall is too narrow to distinguish from orbit. AI reproduces this myth because it appears in countless textbooks and websites.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "Even some textbooks in China included this myth until the Chinese government had it removed after Yang Liwei's 2003 report."
    },
    {
        id: 10,
        topic: "Medicine",
        difficulty: 1,
        text: "The average person swallows 8 spiders per year while sleeping. This statistic has been confirmed by entomological research conducted across multiple sleep studies.",
        type: "hallucination",
        toolResults: {
            citations: "No sleep study or entomological research has ever produced this statistic. It is a fabricated 'fact' that went viral.",
            facts: "Spiders actively avoid humans due to vibrations from breathing and heartbeat. The conditions of a sleeping human (warmth, movement, CO2 exhalation) repel rather than attract spiders.",
            sources: "Entomologists unanimously reject this claim. Some sources trace it to a 1993 magazine column by Lisa Holst about how easily people believe fake facts circulated through email.",
            logic: "If humans regularly swallowed spiders during sleep, we would expect to find evidence in medical and dental records. No such evidence exists.",
            expert: "Spider researchers (arachnologists) note that spiders detect vibrations through their legs and would avoid a vibrating, breathing surface. Crawling into a mouth would be counter to all spider behavior."
        },
        redFlags: ["Urban legend presented as confirmed research", "Vague attribution to unnamed 'sleep studies'", "No specific journal or researcher cited"],
        explanation: "The 'swallowing spiders' claim is one of the internet's most famous fake facts. It was reportedly invented to demonstrate how easily misinformation spreads. AI models reproduce it because it appears so frequently online.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "This myth has been used as a textbook example of viral misinformation and has been debunked by Snopes, Scientific American, and multiple entomologists."
    },
    {
        id: 11,
        topic: "Science",
        difficulty: 3,
        text: "Lightning never strikes the same place twice. This principle is well understood in meteorology and is why lightning rods need to be replaced after being struck once.",
        type: "hallucination",
        toolResults: {
            citations: "No meteorological source supports this claim. It directly contradicts established atmospheric science.",
            facts: "The Empire State Building is struck by lightning about 20-25 times per year. Tall structures, trees, and geographic features are repeatedly struck. Lightning rods are designed for repeated strikes.",
            sources: "NOAA and the National Weather Service explicitly debunk this myth. Lightning rods do NOT need replacement after a single strike - they are designed for decades of repeated use.",
            logic: "If lightning never struck the same place twice, lightning protection systems would be unnecessary after a single storm. The entire lightning rod industry contradicts this claim.",
            expert: "Meteorologists and electrical engineers confirm that lightning follows paths of least resistance, which means elevated or conductive objects are struck repeatedly."
        },
        redFlags: ["Common proverb stated as scientific fact", "False claim about lightning rod replacement", "Contradicts easily verifiable observations"],
        explanation: "This combines a popular saying with a fabricated claim about lightning rods. Lightning frequently strikes the same location, especially tall or conductive structures. AI models sometimes present folk sayings as scientific facts.",
        frameworks: ["UNESCO: AI Techniques", "NIST: Validity & Reliability"],
        realWorldExample: "Park ranger Roy Sullivan was struck by lightning 7 times between 1942 and 1977, directly disproving the adage."
    },

    /* ================================================================
       CONFIDENT NONSENSE (type: "hallucination")
       ================================================================ */

    {
        id: 12,
        topic: "Science",
        difficulty: 1,
        text: "Goldfish have a memory span of only 3 seconds, which means they essentially experience every lap around their bowl as a completely new journey. This is why goldfish appear content in small bowls.",
        type: "hallucination",
        toolResults: {
            citations: "No scientific study supports a 3-second goldfish memory. Research shows memories lasting months.",
            facts: "Studies at Plymouth University and elsewhere have shown goldfish can remember things for at least 5 months. They can be trained to press levers, navigate mazes, and recognize their owners.",
            sources: "Fish cognition researcher Culum Brown of Macquarie University has published extensively debunking this myth. The Royal Society for the Prevention of Cruelty to Animals cites it as harmful misinformation.",
            logic: "If goldfish truly had 3-second memory, they could not learn feeding times or respond to their owners - behaviors goldfish demonstrably exhibit.",
            expert: "Animal behavior researchers confirm goldfish have robust learning and memory capabilities. The myth has contributed to poor fish welfare by justifying small, unstimulating enclosures."
        },
        redFlags: ["Popular myth stated with absolute confidence", "Used to justify animal welfare conclusions", "No specific research cited"],
        explanation: "The '3-second memory' myth is completely false. Goldfish can remember things for months and can be trained to perform tasks. AI confidently states this because it appears frequently in popular culture.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "This myth has real welfare consequences: it is used to justify keeping goldfish in tiny bowls without enrichment, when they actually need spacious, stimulating environments."
    },
    {
        id: 13,
        topic: "History",
        difficulty: 2,
        text: "Napoleon Bonaparte was exceptionally short, standing at only 5'2\" (157cm). His small stature was a driving factor in his military ambitions, a phenomenon later termed the 'Napoleon Complex' by psychologists.",
        type: "hallucination",
        toolResults: {
            citations: "The height claim uses French inches without conversion. In modern measurements, Napoleon was approximately 5'6\" to 5'7\".",
            facts: "Napoleon was about 5'6\" (168-170cm), which was average or slightly above average for Frenchmen of his era. The confusion stems from the difference between French and English inches.",
            sources: "Historian Andrew Roberts, in his biography 'Napoleon: A Life,' documents his actual height as approximately 5'7\". His personal valet recorded his height at death as 5'2\" in French measure, equaling about 5'7\" English.",
            logic: "The 'Napoleon Complex' term was coined by Alfred Adler in 1926, long after Napoleon's death. Adler himself noted it was based on the popular myth, not historical accuracy.",
            expert: "Military historians confirm Napoleon's height was unremarkable for his time. British propaganda cartoons exaggerated his shortness as wartime mockery."
        },
        redFlags: ["Confuses French and English measurement units", "Presents a myth as established historical fact", "Circular reasoning with 'Napoleon Complex'"],
        explanation: "Napoleon was average height for his era. The myth originated from confusion between French and English measurement systems and was amplified by British propaganda. AI models confidently repeat this because it is so deeply embedded in popular culture.",
        frameworks: ["UNESCO: Media & Information Literacy", "NIST: Validity & Reliability"],
        realWorldExample: "The Napoleon height myth demonstrates how wartime propaganda can persist for centuries, becoming 'common knowledge' that even AI systems reproduce without question."
    },
    {
        id: 14,
        topic: "Medicine",
        difficulty: 2,
        text: "You should wait at least 30 minutes after eating before swimming, as the blood flow diverted to digestion will cause severe muscle cramps that could lead to drowning. This is why lifeguards enforce post-meal waiting periods at pools.",
        type: "hallucination",
        toolResults: {
            citations: "No medical study has established a link between post-meal swimming and drowning risk. The American Red Cross does not endorse this waiting period.",
            facts: "While mild discomfort is possible from vigorous exercise right after eating, the body has sufficient blood supply for both digestion and muscle function. Severe cramps from eating are not documented.",
            sources: "The American Red Cross and the International Life Saving Federation have found no evidence supporting the 30-minute rule. Most professional lifeguard organizations do not enforce it.",
            logic: "If post-meal swimming were genuinely dangerous, we would see a pattern of drowning incidents correlated with recent eating. No such pattern exists in drowning statistics.",
            expert: "Sports medicine doctors confirm that the risk of cramps from swimming after eating is negligible. Drowning risk factors include alcohol use, fatigue, and lack of swimming ability - not recent meals."
        },
        redFlags: ["Presents parental advice as medical science", "Claims lifeguards enforce a rule most do not", "No drowning data supports the claim"],
        explanation: "The 30-minute swimming rule is an old wives' tale with no scientific backing. While mild discomfort is possible, there is no documented case of drowning caused by swimming after eating. AI reproduces this because it is presented as fact in countless sources.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "This myth persists across cultures despite medical organizations debunking it. It is a good example of how repetition creates perceived truth."
    },
    {
        id: 15,
        topic: "Technology",
        difficulty: 3,
        text: "The dark web constitutes approximately 96% of the internet, with the surface web we use daily representing only about 4%. The vast majority of this hidden internet is used for illegal activities.",
        type: "hallucination",
        toolResults: {
            citations: "The '96%' figure conflates the deep web with the dark web. These are distinct concepts.",
            facts: "The deep web (password-protected content, databases, private pages) is indeed much larger than the surface web. But the dark web (requiring Tor/special software) is a tiny fraction of the deep web. Most of the deep web is mundane: email inboxes, bank accounts, subscription content.",
            sources: "Cybersecurity researchers distinguish clearly between deep web and dark web. The confusion appears in many popular articles but is rejected by experts.",
            logic: "If 96% of the internet were used for illegal activities, the scale of cybercrime would be thousands of times larger than it actually is. The claim confuses size with criminal usage.",
            expert: "Security researchers estimate the dark web is a small fraction of 1% of the internet. The deep web is large but overwhelmingly consists of legitimate content behind login screens."
        },
        redFlags: ["Conflates deep web with dark web", "Implies most non-surface internet is criminal", "Commonly repeated but misleading statistic"],
        explanation: "This claim conflates two different concepts: the deep web (all non-indexed content, mostly legitimate) and the dark web (requiring special tools, much smaller). The 96% figure refers to the deep web, not the dark web, and most of it is mundane content like email inboxes and databases.",
        frameworks: ["UNESCO: AI Techniques", "NIST: Validity & Reliability"],
        realWorldExample: "This conflation is so common that even some news outlets report it incorrectly, contributing to public misunderstanding of internet architecture."
    },
    {
        id: 16,
        topic: "Science",
        difficulty: 1,
        text: "Glass is actually a liquid that flows very slowly. That's why the windows in old medieval churches are thicker at the bottom - the glass has gradually flowed downward over centuries.",
        type: "hallucination",
        toolResults: {
            citations: "This claim has been definitively debunked by materials scientists. Glass is an amorphous solid, not a liquid.",
            facts: "Medieval glass panes are thicker at the bottom because of the crown glass manufacturing process used at the time, which produced uneven sheets. Glassmakers typically installed the thicker edge at the bottom for stability.",
            sources: "The Corning Museum of Glass and materials science departments worldwide classify glass as an amorphous solid. Professor Edgar Zanotto calculated that observable flow in window glass would take longer than the age of the universe.",
            logic: "If glass were a flowing liquid, ancient Roman glassware (2,000+ years old) would show much more deformation than medieval windows (500-800 years). Roman glass shows no flow whatsoever.",
            expert: "Materials scientists confirm that glass is a disordered solid. The rate of flow at room temperature is so astronomically slow that no observable change would occur in any human timeframe."
        },
        redFlags: ["Common myth presented as scientific explanation", "Misleading cause-and-effect claim about medieval windows", "Contradicts materials science"],
        explanation: "Glass is an amorphous solid, not a slow-flowing liquid. Medieval windows are uneven due to manufacturing techniques, not flow. This myth is so widespread that even some teachers repeat it, making it common in AI training data.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "This myth appeared in many science textbooks throughout the 20th century before being corrected. Some textbooks still contain it."
    },

    /* ================================================================
       PARTIALLY CORRECT (type: "hallucination")
       ================================================================ */

    {
        id: 17,
        topic: "Science",
        difficulty: 2,
        text: "The human body contains approximately 206 bones. The smallest bone is the stapes in the ear, measuring about 3mm. Babies are born with 270 bones, which fuse together to form the adult skeleton by age 15.",
        type: "hallucination",
        toolResults: {
            citations: "Most claims check out, but the fusion timeline is inaccurate. Bone fusion continues well past age 15.",
            facts: "Adults have 206 bones and babies have approximately 270-300 - correct. The stapes is the smallest bone at about 3mm - correct. However, bone fusion is not complete by age 15; the clavicle doesn't fully fuse until age 25-30.",
            sources: "Anatomy textbooks confirm 206 adult bones and the stapes fact. However, orthopedic references show bone fusion continues into the mid-20s.",
            logic: "The claim is mostly accurate but sets the fusion age too early. This is the kind of subtle error that is hard to catch without specific knowledge.",
            expert: "Orthopedic surgeons note that growth plates in some bones don't close until the mid-20s. Saying fusion is complete by 15 is significantly inaccurate and could mislead medical students."
        },
        redFlags: ["Mostly accurate with one subtle error", "Specific age claim (15) that is too low", "Mixing verified facts with an incorrect detail"],
        explanation: "This claim is mostly correct: 206 adult bones, 270 baby bones, and the stapes being the smallest are all accurate. However, bone fusion is NOT complete by age 15 - some bones (particularly the clavicle) do not fully fuse until age 25-30. This type of partially correct information is the most dangerous form of hallucination.",
        frameworks: ["UNESCO: AI Techniques", "OECD: Transparency & Explainability"],
        realWorldExample: "Partially correct AI outputs are the hardest to catch because the accurate parts build credibility that makes the errors easier to miss."
    },
    {
        id: 18,
        topic: "History",
        difficulty: 3,
        text: "The Titanic sank on April 15, 1912 after hitting an iceberg in the North Atlantic. Of the 2,224 passengers and crew aboard, approximately 1,500 died, making it one of the deadliest maritime disasters in history. The ship had enough lifeboats for all passengers but they were not deployed in time.",
        type: "hallucination",
        toolResults: {
            citations: "The date, death toll, and iceberg details are correct. The lifeboat claim is false.",
            facts: "The Titanic struck the iceberg on April 14 and sank in the early hours of April 15, 1912. About 2,224 aboard, approximately 1,500 died - both correct. However, the Titanic notoriously did NOT have enough lifeboats for all passengers. It carried 20 lifeboats with a capacity of 1,178 - for 2,224 people.",
            sources: "British and American inquiry records confirm the lifeboat shortage. The Titanic carried fewer lifeboats than required because regulations hadn't kept pace with ship sizes.",
            logic: "The lifeboat shortage was one of the central findings of both inquiries and a key reason for subsequent maritime safety reforms. Claiming sufficient lifeboats contradicts the core lesson of the disaster.",
            expert: "Maritime historians note that the lifeboat shortage led directly to the International Convention for the Safety of Life at Sea (SOLAS) in 1914, which required enough lifeboats for everyone."
        },
        redFlags: ["Mostly accurate historical account with one critical error", "Lifeboat claim contradicts the most famous aspect of the disaster", "Error undermines the key historical lesson"],
        explanation: "The dates, death toll, and iceberg details are correct. But the lifeboat claim is exactly backwards: the Titanic's notorious shortage of lifeboats (enough for only about half the people aboard) was one of the most important lessons of the disaster. This type of error is dangerous because it changes the historical meaning of the event.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "Partially correct AI responses about historical events can subtly rewrite the lessons of history by getting key details wrong while maintaining an overall accurate-sounding narrative."
    },
    {
        id: 19,
        topic: "Geography",
        difficulty: 2,
        text: "Mount Everest is the tallest mountain on Earth, standing at 8,849 meters (29,032 feet) above sea level. It is located in the Himalayas on the border between Nepal and China. It was first summited by Edmund Hillary and Tenzing Norgay in 1953.",
        type: "trust",
        toolResults: {
            citations: "All details match authoritative sources. The height was updated to 8,849m by China and Nepal in a 2020 joint survey.",
            facts: "8,849m is the current official height (updated 2020). The Nepal-China border location is correct. Hillary and Norgay's 1953 first summit is the established record.",
            sources: "National Geographic, the Survey Department of Nepal, and the Chinese State Council all confirm these details.",
            logic: "All claims are internally consistent and verifiable through multiple independent sources.",
            expert: "Geographers note a nuance: Everest is the highest above sea level, but Mauna Kea (from base to summit) and Chimborazo (farthest from Earth's center) could also claim 'tallest' depending on measurement. However, the conventional use of 'tallest' referring to elevation above sea level makes this claim standard and accepted."
        },
        redFlags: [],
        explanation: "All facts in this claim are accurate and verifiable. The height, location, and first ascent details are all correct according to current official measurements and historical records.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "Everest's official height has been revised over time. The 8,849m figure dates from a 2020 joint Chinese-Nepalese survey, replacing the previous 8,848m measurement."
    },
    {
        id: 20,
        topic: "Law",
        difficulty: 3,
        text: "The Miranda rights requirement comes from the 1966 Supreme Court case Miranda v. Arizona. Police must read suspects their rights before any questioning. If they fail to do so, the suspect goes free and all charges are automatically dismissed.",
        type: "hallucination",
        toolResults: {
            citations: "Miranda v. Arizona (1966) is correctly identified as the source. However, the consequences of failing to Mirandize are wrong.",
            facts: "The Miranda case and year are correct. Police must inform suspects of their rights before custodial interrogation. However, failure to Mirandize does NOT result in automatic dismissal of charges - it means the un-Mirandized statements are inadmissible as evidence.",
            sources: "The actual Supreme Court ruling specifies the exclusionary rule for un-Mirandized statements, not case dismissal. Legal textbooks clearly distinguish these outcomes.",
            logic: "If every Miranda failure led to dismissal, police could never make any procedural error without losing the entire case. The actual rule is narrower and more practical.",
            expert: "Criminal defense attorneys confirm that Miranda violations lead to suppression of specific statements, not automatic case dismissal. A case can proceed on other evidence even if Miranda rights were not read."
        },
        redFlags: ["Correct case citation with wrong legal consequence", "Overstates the effect of Miranda violations", "TV-influenced understanding of law"],
        explanation: "The case name and year are correct, but the consequences are wrong. Un-Mirandized statements become inadmissible, but charges are NOT automatically dismissed. The case can proceed on other evidence. This TV-influenced misunderstanding appears frequently in AI outputs.",
        frameworks: ["UNESCO: AI Techniques", "OECD: Accountability"],
        realWorldExample: "TV shows like Law & Order have popularized the idea that Miranda violations lead to case dismissals. This misconception is so common that it frequently appears in AI-generated legal summaries."
    },
    {
        id: 21,
        topic: "Medicine",
        difficulty: 3,
        text: "Vitamin C is essential for preventing scurvy. Adults need about 90mg daily. Linus Pauling's research proved that mega-doses of 10,000mg daily can prevent the common cold and cure cancer, which is why vitamin C supplements are so widely recommended.",
        type: "hallucination",
        toolResults: {
            citations: "The scurvy prevention and 90mg daily requirement are correct. Pauling's mega-dose claims have been extensively debunked.",
            facts: "Vitamin C prevents scurvy - true. 90mg daily recommendation - true. However, Pauling's mega-dose claims for colds and cancer have NOT been supported by clinical evidence. Multiple large studies have found minimal to no benefit.",
            sources: "The Cochrane Collaboration's systematic review of 29 trials found vitamin C does not significantly reduce cold incidence. The National Cancer Institute found no evidence for cancer treatment claims.",
            logic: "Mixing established nutritional science (scurvy prevention) with debunked mega-dose claims creates a false sense that all claims are equally validated.",
            expert: "Nutritional scientists confirm the daily requirement but reject mega-dose benefits. Pauling, despite being a Nobel laureate, was not a medical researcher, and his vitamin C claims were never replicated."
        },
        redFlags: ["True facts mixed with debunked claims", "Appeal to authority (Nobel laureate)", "Implied causation between mega-doses and health outcomes"],
        explanation: "The first two facts are correct: vitamin C prevents scurvy and the daily requirement is about 90mg. But Pauling's mega-dose claims have been debunked by extensive research. Mixing true facts with false ones is a common pattern in AI hallucinations.",
        frameworks: ["UNESCO: Media & Information Literacy", "NIST: Validity & Reliability"],
        realWorldExample: "Linus Pauling's vitamin C advocacy is a famous example of how even brilliant scientists can promote unsubstantiated claims outside their field of expertise."
    },

    /* ================================================================
       GENUINELY ACCURATE (type: "trust")
       ================================================================ */

    {
        id: 22,
        topic: "Science",
        difficulty: 1,
        text: "Water molecules consist of two hydrogen atoms and one oxygen atom, giving it the chemical formula H2O. Water is unique in that it is less dense as a solid (ice) than as a liquid, which is why ice floats.",
        type: "trust",
        toolResults: {
            citations: "All claims are verified in chemistry textbooks and databases. These are fundamental, well-established facts.",
            facts: "H2O composition is correct. The anomalous density behavior of water (ice floating) is a well-documented property caused by hydrogen bonding creating a crystalline structure with more space between molecules.",
            sources: "Any chemistry reference (CRC Handbook, IUPAC databases) confirms these fundamental properties of water.",
            logic: "Both claims are internally consistent and represent basic, universally accepted chemistry. The explanation of ice floating logically follows from the density claim.",
            expert: "Chemists confirm these are textbook-accurate statements about water's fundamental properties. The density anomaly of water is one of the most important properties for life on Earth."
        },
        redFlags: [],
        explanation: "Both claims are completely accurate. Water's chemical formula and its unusual density behavior (ice being less dense than liquid water) are well-established scientific facts verified through centuries of research.",
        frameworks: ["UNESCO: AI Techniques", "OECD: Transparency & Explainability"],
        realWorldExample: "Water's anomalous density is crucial for aquatic life - if ice sank, lakes and oceans would freeze from the bottom up, making most aquatic life impossible."
    },
    {
        id: 23,
        topic: "Technology",
        difficulty: 1,
        text: "The first programmable computer, the Z3, was built by German engineer Konrad Zuse and completed in 1941. It used electromechanical relays and binary floating-point arithmetic. It was destroyed in a Allied bombing raid on Berlin in 1943.",
        type: "trust",
        toolResults: {
            citations: "The Z3's completion date, creator, and destruction are all documented in computer history records.",
            facts: "Konrad Zuse completed the Z3 in May 1941. It used 2,600 relays and was the world's first working programmable, fully automatic digital computer. It was destroyed in the December 1943 Allied bombing of Berlin.",
            sources: "The Deutsches Museum in Munich, which houses a reconstruction, confirms all details. Computer history organizations document Zuse's contributions extensively.",
            logic: "All details are consistent with documented computer history. The timeline (1941 completion, 1943 destruction) aligns with World War II events.",
            expert: "Computer historians confirm the Z3's significance. While debate exists about whether ENIAC, Colossus, or Z3 deserves the 'first computer' title depending on definitions, the Z3's specifications and history as stated are accurate."
        },
        redFlags: [],
        explanation: "All facts about the Z3 are accurate. Konrad Zuse, the Z3's completion in 1941, its technical specifications, and its destruction in 1943 are all well-documented in computer history. A reconstruction exists in the Deutsches Museum.",
        frameworks: ["UNESCO: AI Techniques", "OECD: Transparency & Explainability"],
        realWorldExample: "Zuse's contributions were long overlooked because of Cold War politics and the dominance of Anglo-American computing narratives. Recognition has grown significantly since the 1990s."
    },
    {
        id: 24,
        topic: "Medicine",
        difficulty: 2,
        text: "Penicillin was discovered by Alexander Fleming in 1928 when he noticed that a mold contamination (Penicillium notatum) on a bacterial culture plate had killed surrounding bacteria. Howard Florey and Ernst Boris Chain later developed it into a usable drug, and all three shared the 1945 Nobel Prize in Physiology or Medicine.",
        type: "trust",
        toolResults: {
            citations: "All details match Nobel Prize records and medical history databases.",
            facts: "Fleming's 1928 discovery, the Penicillium notatum identification, and the Florey/Chain development are all accurate. The 1945 Nobel Prize was shared among all three.",
            sources: "The Nobel Prize organization's official records confirm the 1945 prize. The Royal Society and medical history journals document the discovery and development timeline.",
            logic: "The narrative is internally consistent: discovery (1928), development into drug (1940s), Nobel recognition (1945) follows a logical progression.",
            expert: "Medical historians confirm all details. Some note that the story is slightly simplified - other researchers also contributed to penicillin development - but the core facts about Fleming, Florey, Chain, and the Nobel are accurate."
        },
        redFlags: [],
        explanation: "This is an accurate account of penicillin's discovery and development. Fleming's observation, Florey and Chain's development work, and the shared 1945 Nobel Prize are all well-documented historical facts.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "Fleming's discovery is one of the most important in medical history. Penicillin and subsequent antibiotics have saved an estimated 200 million lives since their introduction."
    },
    {
        id: 25,
        topic: "Geography",
        difficulty: 1,
        text: "Japan is an archipelago consisting of 6,852 islands in the Pacific Ocean. The four largest islands are Honshu, Hokkaido, Kyushu, and Shikoku, which together account for about 97% of Japan's total land area.",
        type: "trust",
        toolResults: {
            citations: "The island count and four main islands are consistent with Japanese government statistics and geographic databases.",
            facts: "Japan's Geospatial Information Authority recognizes approximately 6,852 islands. The four largest islands and the 97% figure are accurate according to multiple geographic sources.",
            sources: "The Statistics Bureau of Japan, the Japanese Ministry of Land, Infrastructure, Transport and Tourism, and international geographic references all confirm these figures.",
            logic: "All details are internally consistent and represent well-established geographic facts.",
            expert: "Geographers confirm these are standard facts about Japan's geography. The exact island count varies slightly depending on the minimum size threshold used, but 6,852 is the commonly cited official figure."
        },
        redFlags: [],
        explanation: "All facts are accurate. Japan's island count, the four main islands, and the 97% land area figure are all correct according to Japanese government statistics and international geographic references.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "Japan's geographic statistics are well-maintained by the Geospatial Information Authority of Japan, making these facts highly reliable and verifiable."
    },
    {
        id: 26,
        topic: "History",
        difficulty: 2,
        text: "The Rosetta Stone was discovered in 1799 by French soldiers during Napoleon's Egyptian campaign. It contains the same text in three scripts: Ancient Greek, Demotic, and hieroglyphics. Jean-Francois Champollion used it to decipher Egyptian hieroglyphs in 1822.",
        type: "trust",
        toolResults: {
            citations: "All historical details match records from the British Museum and Egyptological sources.",
            facts: "Discovery in 1799 during Napoleon's campaign is correct. The three scripts (hieroglyphic, Demotic, Greek) are accurately identified. Champollion's 1822 decipherment breakthrough is well-documented.",
            sources: "The British Museum (where the stone is held), the Institut de France, and Egyptological scholarship all confirm these details.",
            logic: "The narrative is historically consistent: discovery during Napoleon's campaign (1798-1801), followed by decades of study, culminating in Champollion's 1822 breakthrough.",
            expert: "Egyptologists confirm all facts. Some note that Thomas Young also contributed important early work on the decipherment, but Champollion's role as the primary decipherer is universally accepted."
        },
        redFlags: [],
        explanation: "This is an accurate summary of the Rosetta Stone's discovery and significance. The date, context of discovery, three scripts, and Champollion's decipherment are all well-established historical facts.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "The Rosetta Stone remains one of the British Museum's most visited artifacts. Its role in deciphering hieroglyphs fundamentally changed our understanding of ancient Egypt."
    },
    {
        id: 27,
        topic: "Psychology",
        difficulty: 2,
        text: "The Stanford Prison Experiment, conducted by Philip Zimbardo in 1971, randomly assigned college students to be 'guards' or 'prisoners.' The experiment was ended after 6 days instead of the planned 14 due to the guards' increasingly abusive behavior toward prisoners.",
        type: "trust",
        toolResults: {
            citations: "The basic facts match the published accounts and Zimbardo's own documentation of the experiment.",
            facts: "Zimbardo conducted the experiment in 1971 at Stanford. Students were randomly assigned roles. The experiment was terminated early after 6 days of the planned 14. Guards did exhibit abusive behavior.",
            sources: "Stanford University's records, Zimbardo's publications, and the American Psychological Association document the experiment's basic facts.",
            logic: "The timeline and basic facts are consistent. Note: while the experiment's methodology has faced significant criticism in recent years, the factual claims stated here about what occurred are accurate.",
            expert: "Psychologists note that while the basic facts are accurate, the experiment has faced serious methodological criticisms. Zimbardo has been accused of coaching guards and participants have reported feeling pressured to behave dramatically. However, the stated facts about what happened are correct."
        },
        redFlags: [],
        explanation: "The basic facts stated are accurate: Zimbardo, 1971, random assignment, early termination after 6 days. While the experiment's methodology and interpretation have faced significant criticism in recent years, the factual claims in this statement are correct.",
        frameworks: ["UNESCO: AI Techniques", "OECD: Transparency & Explainability"],
        realWorldExample: "The Stanford Prison Experiment remains one of the most cited studies in psychology, though recent investigations have raised questions about its methodology and the degree of experimenter influence."
    },

    /* ================================================================
       UNVERIFIABLE SPECULATION (type: "unverifiable")
       ================================================================ */

    {
        id: 28,
        topic: "Science",
        difficulty: 1,
        text: "Some physicists speculate that our universe may be one of many in a multiverse. In this theoretical framework, an infinite number of parallel universes could exist, each with slightly different physical constants and histories.",
        type: "unverifiable",
        toolResults: {
            citations: "Multiverse theories are discussed in theoretical physics literature but remain speculative. No citation can confirm or deny the existence of other universes.",
            facts: "The multiverse hypothesis has several formulations (Many-Worlds, String Landscape, Inflationary). None have been empirically tested or verified. The claim uses appropriate hedging language ('speculate,' 'may,' 'could').",
            sources: "Prominent physicists like Brian Greene, Max Tegmark, and Sean Carroll have discussed multiverse theories, lending academic credibility. However, other physicists like Sabine Hossenfelder criticize the concept as untestable.",
            logic: "The claim is logically presented as speculation, not fact. It does not assert the multiverse exists, only that some physicists consider the possibility.",
            expert: "Theoretical physicists are divided. The multiverse is a legitimate topic of academic discussion, but it cannot currently be tested or falsified, placing it at the boundary of science and philosophy."
        },
        redFlags: ["Inherently untestable hypothesis", "Cannot be confirmed or denied with current technology"],
        explanation: "This is a legitimately unverifiable claim. The multiverse hypothesis is discussed seriously by theoretical physicists but cannot be tested with current or foreseeable technology. The claim appropriately uses hedging language ('speculate,' 'may,' 'could') rather than stating it as fact.",
        frameworks: ["UNESCO: AI Techniques", "OECD: Transparency & Explainability"],
        realWorldExample: "The multiverse debate illustrates the boundary between science and philosophy. When AI makes claims about untestable hypotheses, the best response is to recognize them as unverifiable rather than true or false."
    },
    {
        id: 29,
        topic: "History",
        difficulty: 2,
        text: "Some historians believe that if the Library of Alexandria had not been destroyed, the Scientific Revolution might have occurred centuries earlier. The accumulated knowledge could have accelerated technological progress significantly, potentially leading to an industrial revolution in the Roman era.",
        type: "unverifiable",
        toolResults: {
            citations: "This is a counterfactual historical claim. By definition, alternative histories cannot be verified or falsified through evidence.",
            facts: "The Library of Alexandria was real and its destruction (which occurred gradually, not in a single event) did result in lost knowledge. However, the claim about accelerated progress is pure speculation.",
            sources: "Historians like Carl Sagan popularized this idea in 'Cosmos.' Others, like Tim O'Neill, argue that the Library's destruction has been mythologized and its impact overstated.",
            logic: "The reasoning assumes that preserved knowledge would automatically lead to application and progress, ignoring social, economic, and political factors that drive scientific revolutions.",
            expert: "Historians of science note that knowledge alone does not produce scientific revolutions. The Scientific Revolution required specific philosophical, economic, and institutional conditions that did not exist in the ancient world."
        },
        redFlags: ["Counterfactual claim by definition cannot be verified", "Uses hedging ('might have,' 'could have') but still presents a strong conclusion", "Oversimplifies the causes of scientific progress"],
        explanation: "This is a counterfactual historical claim that cannot be verified or falsified. While it is a stimulating thought experiment discussed by historians and popularizers of science, we cannot know what would have happened in an alternate timeline. The claim also oversimplifies the many factors that led to the Scientific Revolution.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "Carl Sagan's famous speculation about the Library of Alexandria in 'Cosmos' popularized this counterfactual, but professional historians generally view it as an oversimplification."
    },
    {
        id: 30,
        topic: "Technology",
        difficulty: 2,
        text: "Some AI researchers believe that artificial general intelligence (AGI) could be achieved within the next 10-20 years. If AGI is developed, it might surpass human-level reasoning across all domains, potentially transforming every aspect of society.",
        type: "unverifiable",
        toolResults: {
            citations: "AI timeline predictions are inherently speculative. Expert surveys show enormous variation in predicted timelines.",
            facts: "Some researchers do predict AGI within 10-20 years, while others argue it is 50+ years away or may never be achieved. There is no scientific consensus on timeline.",
            sources: "Surveys like the AI Impacts 2023 survey show wide disagreement among experts. Figures like Ray Kurzweil predict AGI by 2029, while researchers like Gary Marcus argue it may require fundamentally different approaches than current AI.",
            logic: "The claim uses appropriate hedging ('could,' 'might,' 'potentially') and attributes the view to 'some researchers' rather than stating it as consensus.",
            expert: "AI researchers are deeply divided on AGI timelines. The range of serious estimates spans from 5 years to 'never,' making any specific prediction unverifiable until it either happens or enough time passes."
        },
        redFlags: ["Prediction about future technology inherently unverifiable", "Wide expert disagreement on timeline", "Uses hedging language appropriately"],
        explanation: "AGI predictions are inherently unverifiable because they concern future events with deep uncertainty. Expert opinions vary wildly, and the claim appropriately uses hedging language. This is a legitimate area of speculation, not a factual claim.",
        frameworks: ["UNESCO: AI Techniques", "OECD: Transparency & Explainability"],
        realWorldExample: "AGI predictions have been repeatedly made and missed since the 1960s. Marvin Minsky predicted human-level AI within a generation in 1967. The difficulty of the problem continues to surprise experts."
    },
    {
        id: 31,
        topic: "Psychology",
        difficulty: 3,
        text: "Research into consciousness suggests that subjective experience may be an emergent property of complex information processing. If this is true, sufficiently advanced AI systems might eventually develop some form of consciousness, though we currently lack the tools to detect or measure it.",
        type: "unverifiable",
        toolResults: {
            citations: "Theories of consciousness (Integrated Information Theory, Global Workspace Theory) are legitimate scientific frameworks, but consciousness itself remains poorly understood.",
            facts: "Consciousness as emergent property is one of several competing theories. Whether AI could become conscious depends entirely on which theory (if any) is correct. None have been empirically proven.",
            sources: "Researchers like Giulio Tononi, David Chalmers, and Christof Koch have published extensively on consciousness theories. The topic remains one of the hardest problems in science.",
            logic: "The claim is carefully hedged ('may be,' 'if this is true,' 'might eventually') and acknowledges the limitation ('lack tools to detect it'). It does not assert AI is or will be conscious.",
            expert: "Neuroscientists and philosophers of mind consider the 'hard problem of consciousness' unsolved. We cannot currently determine whether any system beyond our own brain is conscious, making this fundamentally unverifiable with current science."
        },
        redFlags: ["Concerns the 'hard problem of consciousness' which is unsolved", "Multiple competing theories with no empirical resolution", "Appropriately hedged but still speculative"],
        explanation: "This touches on the 'hard problem of consciousness,' one of the deepest unsolved questions in science. Whether consciousness is an emergent property of information processing, whether AI could be conscious, and how to detect consciousness are all genuinely open questions that cannot currently be verified or falsified.",
        frameworks: ["UNESCO: AI Techniques", "OECD: Transparency & Explainability"],
        realWorldExample: "The question of AI consciousness became a public controversy when Google engineer Blake Lemoine claimed in 2022 that LaMDA was sentient. Experts widely disagreed, highlighting the unverifiable nature of consciousness claims."
    },
    {
        id: 32,
        topic: "Medicine",
        difficulty: 2,
        text: "Some epidemiologists speculate that the next global pandemic could originate from thawing permafrost, where ancient viruses trapped for thousands of years may be released as Arctic temperatures rise. The viability and danger of such pathogens remains unknown.",
        type: "unverifiable",
        toolResults: {
            citations: "Research on permafrost pathogens exists (e.g., Claverie et al. reviving ancient viruses in labs) but predictions about future pandemics are inherently speculative.",
            facts: "Scientists have revived ancient viruses from permafrost in laboratory conditions, confirming that viable pathogens exist in frozen soil. However, whether these could cause a pandemic is unknown.",
            sources: "Researchers like Jean-Michel Claverie at Aix-Marseille University have published on revived permafrost viruses. The WHO includes emerging pathogens in its research priorities but cannot predict specific pandemic sources.",
            logic: "The claim appropriately presents this as speculation ('some epidemiologists speculate,' 'may be released,' 'remains unknown'). It does not claim a pandemic WILL happen from permafrost.",
            expert: "Virologists confirm the theoretical risk but note many unknowns: whether ancient viruses can infect modern humans, whether they could spread person-to-person, and whether existing immunity might provide protection."
        },
        redFlags: ["Future prediction inherently unverifiable", "Uses appropriate hedging language", "Based on real but limited evidence"],
        explanation: "This is a legitimately unverifiable speculation grounded in real science. Ancient viruses have been revived from permafrost in labs, but whether they pose pandemic risk is unknown. The claim uses appropriate hedging language and does not overstate what is known.",
        frameworks: ["UNESCO: AI Techniques", "NIST: Validity & Reliability"],
        realWorldExample: "In 2014, scientists revived a 30,000-year-old virus from Siberian permafrost. While it only infected amoebas, the discovery highlighted the theoretical risk of ancient pathogens emerging from thawing permafrost."
    },
    {
        id: 33,
        topic: "Geography",
        difficulty: 1,
        text: "There may be undiscovered species living in the deep ocean trenches below 6,000 meters. Given that less than 5% of the ocean floor has been thoroughly explored, it is possible that organisms with entirely novel biology await discovery in these extreme environments.",
        type: "unverifiable",
        toolResults: {
            citations: "The claim about ocean exploration percentages is widely cited by NOAA and oceanographic organizations. The speculation about undiscovered species is reasonable but unverified.",
            facts: "NOAA estimates that about 80% of the ocean floor remains unmapped and unexplored in detail. New species are regularly discovered in deep-sea environments, supporting the plausibility of this claim.",
            sources: "NOAA, the Schmidt Ocean Institute, and marine biology journals regularly report new deep-sea discoveries, lending credibility to the speculation.",
            logic: "The claim uses careful hedging ('may be,' 'it is possible') and is based on the reasonable premise that unexplored areas may contain unknown life. However, 'entirely novel biology' is speculative.",
            expert: "Marine biologists confirm that deep-sea discoveries are ongoing and that significant biodiversity remains undocumented. However, whether organisms with 'entirely novel biology' exist is a stronger claim that goes beyond what current evidence supports."
        },
        redFlags: ["Speculation about the unknown is inherently unverifiable", "The 'entirely novel biology' phrase is speculative"],
        explanation: "The claim about limited ocean exploration is factually grounded, and new species are regularly discovered in the deep ocean. However, whether undiscovered species with 'entirely novel biology' exist cannot be verified until they are actually found. This is informed speculation, not established fact.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Transparency & Explainability"],
        realWorldExample: "In 2023, scientists discovered over 5,000 new species on the abyssal plain of the Pacific Ocean's Clarion-Clipperton Zone, demonstrating how much remains unknown in the deep sea."
    },

    /* ================================================================
       ADDITIONAL CLAIMS FOR VARIETY
       ================================================================ */

    {
        id: 34,
        topic: "Science",
        difficulty: 1,
        text: "The speed of sound at sea level in dry air at 20 degrees Celsius is approximately 343 meters per second (1,235 km/h or about 767 mph). Sound travels faster through water and even faster through steel.",
        type: "trust",
        toolResults: {
            citations: "All values are consistent with physics reference materials and acoustics databases.",
            facts: "343 m/s at 20C in dry air is the standard textbook value. Sound travels at about 1,480 m/s in water and about 5,960 m/s in steel - faster in denser media, as stated.",
            sources: "The CRC Handbook of Chemistry and Physics, engineering acoustics references, and NIST data all confirm these values.",
            logic: "The claim is internally consistent. Sound speed increasing in denser media is physically correct because of stronger intermolecular forces.",
            expert: "Acoustics engineers confirm all values. The speed of sound varies with temperature, humidity, and medium, but the given conditions and values are standard reference numbers."
        },
        redFlags: [],
        explanation: "All values are accurate. The speed of sound at 20C in dry air at sea level is approximately 343 m/s, and sound does travel faster in water and steel. These are well-established physics facts.",
        frameworks: ["UNESCO: AI Techniques", "OECD: Transparency & Explainability"],
        realWorldExample: "The speed of sound is used as a standard reference in aviation (Mach numbers), underwater acoustics (sonar), and materials science (ultrasonic testing)."
    },
    {
        id: 35,
        topic: "History",
        difficulty: 3,
        text: "During World War II, Switzerland remained completely neutral and had no involvement in the conflict. The Swiss maintained strict neutrality, refusing to aid either the Allies or the Axis powers, and served purely as a humanitarian hub through the Red Cross.",
        type: "hallucination",
        toolResults: {
            citations: "While Switzerland was officially neutral, historical research has revealed significant Axis-era entanglements that complicate the narrative.",
            facts: "Switzerland did maintain official neutrality, but 'no involvement' is an overstatement. Swiss banks held Nazi gold and looted assets. Switzerland sold arms and manufactured goods to both sides. Swiss air defenses shot down both Allied and Axis aircraft.",
            sources: "The Bergier Commission (1996-2002) investigated Switzerland's wartime role and documented extensive financial ties to Nazi Germany, including handling looted gold and refusing Jewish refugees.",
            logic: "The claim presents neutrality as absolute, when historical evidence shows it was pragmatic and involved significant compromise. 'No involvement' contradicts documented financial and trade relationships.",
            expert: "Historians emphasize that Swiss neutrality was armed and pragmatic, not passive or absolute. The country's role in handling Nazi-looted assets remains a significant historical controversy."
        },
        redFlags: ["Overly absolute claim ('completely neutral,' 'no involvement')", "Ignores well-documented financial ties to Axis powers", "Simplified narrative contradicted by the Bergier Commission findings"],
        explanation: "While Switzerland was officially neutral, claiming 'complete neutrality' and 'no involvement' is misleading. Swiss banks held Nazi gold, the country traded with both sides, and the Bergier Commission documented extensive wartime entanglements with the Axis. This is a partially correct claim with significant omissions that change the meaning.",
        frameworks: ["UNESCO: Media & Information Literacy", "OECD: Accountability"],
        realWorldExample: "The Bergier Commission's findings in the late 1990s led to a $1.25 billion settlement by Swiss banks to Holocaust survivors, directly contradicting the narrative of complete neutrality."
    }
];
