'use strict';
/* 64괘 영어 데이터 (전 항목 번역 완료).
   name / keyword / summary : 괘 이름·키워드·한 줄 요약
   core / situation / example / actions[] / practical[] : 결과 화면의 상세 풀이
   list{kw, meaning, advice, example} : '64괘 해설' 목록 페이지용
   키는 hexagrams.js 와 같은 형식(아래 1효→위 6효, 양=1 음=0). */
const HEXAGRAMS_EN = {
 "100000": {
  "name": "Return (Fu)",
  "keyword": "Return and recovery",
  "summary": "A turning point: a fresh start is coming; move gently and steadily.",
  "core": "Something that has been stalled, a relationship that has drifted apart, or a life rhythm that has fallen apart is slowly finding its way back. Returning in the right direction matters more than making a big leap.",
  "situation": "This fits situations like recovering after a mistake, regaining health, trying again, rebuilding a relationship, or restarting your studies. Rather than fearing past failure, the key is to come back stronger this time.",
  "example": "If someone who paused their exam preparation and now wants to restart receives this hexagram, it means the best path is not to blame yourself for being late but to first restore your daily rhythm and study habits.",
  "actions": [
   "Don't try to be perfect from the start; count the restart itself as a success.",
   "Pick just one basic habit you need to return to now, and recover it first.",
   "At the start of a recovery, staying consistent matters more than speed."
  ],
  "practical": [
   "Rebuild the routine that fell apart, one small piece at a time.",
   "Restore a broken relationship with steady, sincere behavior rather than fancy words.",
   "If you are trying again, write down the specific causes of your last failure so you don't repeat them."
  ],
  "list": {
   "kw": "Recovery and coming back",
   "meaning": "Thunder stirs again beneath the earth. It means a small spark of recovery returns after a long slump.",
   "advice": "Value the signs of change even when they are small, and don't rush. Go back to the basics and keep at them steadily.",
   "example": "When starting again after a failure, build small successes rather than launching something big from the start."
  }
 },
 "100001": {
  "name": "Nourishment (Yi)",
  "keyword": "Feeding and caring",
  "summary": "What you feed (body, mind, people) shapes your direction; watch what you take in and what you say.",
  "core": "Yi (頤) means the jaw. From the image of a mouth that eats and speaks, it describes how to nourish body and mind. This hexagram asks you to look at how you nourish yourself and how you nourish others; the basics are to be careful with words and moderate with food.",
  "situation": "This is a time when health, daily habits, the way you speak, and looking after other people matter. Checking what you take in and what you put out will make your direction clear.",
  "example": "If someone whose life has fallen out of order because of work stress receives this hexagram, it means: rather than clinging to results, first restore the basics of self-care, such as meals, sleep, and restraint in speech.",
  "actions": [
   "Pick one thing to fix in your eating habits or the way you speak this week, and do it.",
   "If you help or teach others, keep doing it steadily and by sound standards.",
   "Cut back on overstimulating information and spending, and choose what is good for body and mind."
  ],
  "practical": [
   "Check your eating and drinking habits, sleep, and exercise.",
   "Speak less and more carefully to avoid unnecessary conflict.",
   "Ask yourself whether the information and people you rely on are nourishing you in the right way."
  ],
  "list": {
   "kw": "Nourishment through words and food",
   "meaning": "Thunder beneath a mountain. It asks you to look at what goes in and out through the mouth: food, words, and what feeds the mind.",
   "advice": "Look at what you eat, what information you take in, and what you say. Make choices that nourish yourself and others in a healthy way.",
   "example": "Cut back on overstimulating information, and in important conversations choose words that help rather than words that hurt."
  }
 },
 "100010": {
  "name": "Difficulty at the Beginning (Zhun)",
  "keyword": "Hardship at the start",
  "summary": "Everything is new and unsettled; progress comes from patient groundwork and trusted helpers.",
  "core": "Something has just begun or is about to begin, but conditions are not fully ready yet. Rushing may tangle things further; if you sort out small problems and build a foundation, the way gradually opens.",
  "situation": "This is a flow full of early trial and error, as with a new job, a new business, a new relationship, or starting to study. The direction is not bad, but if you expect everything to go smoothly from the start, the disappointment will be greater.",
  "example": "If you are preparing to start a business, the first inquiry, the first contract, and the first mistakes may go less smoothly than you expected. Rather than overturning your whole direction, sort the problems out one at a time, and things are likely to settle down afterward.",
  "actions": [
   "Don't try to finish everything at once; set goals step by step.",
   "List the information, people, and resources you need now, and secure them in order of priority.",
   "The more anxious you feel, the more you should hold to basic principles and cut back on impulsive changes."
  ],
  "practical": [
   "Don't write off early chaos as failure; accept it as the cost of learning.",
   "Decide clearly who you can ask for help and what standards you will refer to, so there is less confusion.",
   "Building up small successes to create a rhythm is what matters."
  ],
  "list": {
   "kw": "Difficulty of beginnings",
   "meaning": "Water is above and thunder is below, like a sprout pushing up through the earth. Beginnings are hard, but there is room to grow.",
   "advice": "Don't conclude it is a failure just because there is early confusion. Break your plan into small parts and secure help and order.",
   "example": "In the early days of a new job or business, set up basic procedures and working relationships before expanding too fast."
  }
 },
 "100011": {
  "name": "Increase (Yi)",
  "keyword": "Benefit",
  "summary": "Good currents help you; follow what is good and help others too.",
  "core": "Yi (益) shows wind and thunder helping each other so that all things grow, and it means the benefit of taking from above to add to those below. It is a good time to take on big undertakings, with the attitude of following what is good when you see it and fixing a fault when you have one.",
  "situation": "Support and opportunities appear, and growth comes easily. The benefit lasts when you use what you receive not only for personal gain but to benefit others widely.",
  "example": "If someone who can start a new challenge thanks to a mentor's support receives this hexagram, it means the most beneficial thing is to make active use of the opportunity and put what you learn into practice right away.",
  "actions": [
   "Prioritize the offer or support that would help you most right now, and apply for it.",
   "Pick one habit you need to change and start working on it immediately.",
   "When you get results, thank the people who helped you."
  ],
  "practical": [
   "Don't put off a good opportunity; make active use of it.",
   "When you see something worth learning, try copying it right away, and fix what needs fixing at once.",
   "Look for ways to give back the help you received to the people around you."
  ],
  "list": {
   "kw": "Gain and growth",
   "meaning": "Wind and thunder help each other. It means resources and opportunities are added in a good direction, and growth follows.",
   "advice": "When an opportunity comes, learn, share, and act. If you grow together with those around you rather than piling up gains alone, your foundation becomes solid.",
   "example": "If you get a new opportunity, learn the skills you need and share the results with the people who helped you."
  }
 },
 "100100": {
  "name": "The Arousing (Zhen)",
  "keyword": "Shock",
  "summary": "A shock arrives; be cautious and reflect, and you will come out stronger.",
  "core": "Zhen (震) shows thunder rolling again and again, and it means sudden shock and surprise. If you feel the fear and reflect on yourself, you will end up able to talk and laugh about it. Even when thunder startles a hundred miles around, you need the calm of one who does not drop the ladle and the wine during the ritual.",
  "situation": "This is an anxious time when an unexpected event or change has arrived. If you keep your center in the midst of the shock and check yourself, the crisis can become a chance to grow.",
  "example": "If someone shaken by news of a sudden layoff or an accident receives this hexagram, it means: rather than panicking and deciding in haste, calmly sort out the situation and use this event as a chance to take stock.",
  "actions": [
   "Separate what you can control from what you can't in the situation you face now.",
   "Make a checklist to prevent it from happening again.",
   "Keep up a daily routine that can settle your shaken mind."
  ],
  "practical": [
   "When something shocking happens, first steady your breathing and focus on the basics.",
   "Use the fear as a chance to reflect on what you lack and make up for it.",
   "After the commotion passes, deal with the aftermath calmly."
  ],
  "list": {
   "kw": "Shock and awakening",
   "meaning": "Thunder rolls again and again. A sudden event startles you, but the shock wakes you up and gets you ready.",
   "advice": "Don't decide in haste while swept up in the shock. If you confirm the risks and check the basics, the crisis becomes a reason to stay alert.",
   "example": "When an unexpected problem comes up, first make sure everyone is safe, confirm the facts, and then decide the order of your response."
  }
 },
 "100101": {
  "name": "Biting Through (Shi He)",
  "keyword": "Decisive resolution",
  "summary": "Clear the obstacle firmly and fairly instead of avoiding it.",
  "core": "Shi He (噬嗑) shows something stuck between the jaws that must be bitten through before the mouth can close. Obstacles or wrongs that block communication and progress must be clearly identified and dealt with for things to go well, and laws and standards should be clear and strict. But being too harsh becomes a fault in itself.",
  "situation": "This is a time when obstacles, opaque practices, or repeated wrongs come to light in a relationship or at work. They should be resolved step by step, based on standards and evidence rather than emotion.",
  "example": "If repeated lateness or dodging of responsibility has soured the mood on a team, the way to resolve it is not to put personal feelings first but to set clear standards and apply them consistently.",
  "actions": [
   "Narrow down the cause of the blockage to one thing, and make a plan to resolve it this week.",
   "Make the standards and consequences for broken rules transparent.",
   "After dealing with it, write down rules to prevent it from happening again."
  ],
  "practical": [
   "Find the cause of the problem and handle it based on facts and rules.",
   "Correct small wrongs early so they don't become big problems.",
   "Even while being strict, don't lose consideration for the people involved."
  ],
  "list": {
   "kw": "Removing obstacles, deciding firmly",
   "meaning": "Fire and thunder come together. Just as you bite through an obstacle in your mouth, you deal clearly with the problem blocking your work.",
   "advice": "Don't leave problems vague; resolve them according to facts and rules. Firmness is needed, but put a fair solution ahead of punishment.",
   "example": "If the same violation keeps happening at work, state the standard clearly and apply it consistently."
  }
 },
 "100110": {
  "name": "Following (Sui)",
  "keyword": "Following the times",
  "summary": "Adapt to people and circumstances; follow what is right and stay flexible.",
  "core": "Sui (隨) means to follow, and it describes the wisdom of moving flexibly with the flow of the times and with people you can trust. Like going indoors to rest when the sun sets, move in step with the times, but choose carefully whom you follow, and don't lose an important person over a small gain.",
  "situation": "This is a time to adapt to a changing environment and follow a new trend or leader. It works in your favor if you let go of stubbornness and keep a learner's attitude, but it gets difficult if you are swept along without principles.",
  "example": "If someone who has to learn new technology because industry trends have changed receives this hexagram, it means: rather than clinging to old methods, ride the flow of change, but choose proven methods and teachers.",
  "actions": [
   "Check whether the way you are holding on to is still effective in your present environment.",
   "Pick one mentor or standard to get advice from, and follow it steadily.",
   "The bigger the immediate gain from a choice, the more you should double-check that it fits your principles."
  ],
  "practical": [
   "Be flexible enough to change your approach when circumstances change.",
   "When choosing whom or what to follow, look at integrity and sustainability.",
   "If you want others to follow you, first act rightly yourself."
  ],
  "list": {
   "kw": "Following with flexibility",
   "meaning": "Thunder beneath a lake. It means the wisdom of watching the situation and the people, and following appropriately.",
   "advice": "Following isn't about going along with everyone; decide what is worth following. Choose good trends and principles, and change direction if you need to.",
   "example": "If you have joined a new organization, first understand its culture, but keep to your own core principles."
  }
 },
 "100111": {
  "name": "Innocence (Wu Wang)",
  "keyword": "Sincerity without scheming",
  "summary": "Act naturally and honestly, without calculation or forcing.",
  "core": "Wu Wang (无妄) shows thunder rolling beneath heaven so that all things move according to their nature, and it means acting just as you are, without falseness or vain expectations. If you act with an improper heart, unexpected disaster follows, and you should guard against luck-seeking, like hoping to harvest without plowing the field.",
  "situation": "This is a time when sincerity works better than calculation and show. Even if something unexpected happens, you can avoid fault by holding to your own duty as you respond.",
  "example": "If someone who received an investment offer promising big returns in a short time receives this hexagram, it means: guard against the wish for a lucky windfall, and approach it honestly with proven methods.",
  "actions": [
   "Check whether there is anything you are hiding or exaggerating right now.",
   "If you have a plan to get something without paying for it, change it into a realistic alternative.",
   "When something unexpected happens, respond according to your principles."
  ],
  "practical": [
   "Before calculating results, focus on the essence of what needs to be done.",
   "Don't expect luck or shortcuts; go through the process honestly.",
   "Handle unexpected problems calmly rather than feeling wronged."
  ],
  "list": {
   "kw": "Honesty without pretense",
   "meaning": "Heaven and thunder come together. It means to act rightly, without forced pretense or selfish desire.",
   "advice": "Don't distort the facts to produce the result you want. Act honestly, but respond realistically to the unexpected.",
   "example": "When you report results, don't hide unfavorable information, and separate confirmed facts from guesses."
  }
 },
 "101000": {
  "name": "Darkening of the Light (Ming Yi)",
  "keyword": "Light hidden",
  "summary": "In hard times, keep your brightness inside and do not provoke.",
  "core": "Darkening of the Light (明夷) pictures the sun sinking into the earth so that its light is wounded. In deep darkness, shining openly invites harm, so appear modest or even foolish on the outside while protecting your inner clarity and purpose. Staying upright through hardship is what serves you.",
  "situation": "Your talent or opinions are being suppressed, or the environment is working against you. Careful conduct and holding your inner center matter more than a head-on confrontation.",
  "example": "If someone who senses problems in an unreasonable workplace draws this hexagram, it means not to push back rashly. Carry yourself carefully, keep your principles and evidence safe, and wait for the right time.",
  "actions": [
   "Hold off on major claims or exposures until things improve, and quietly gather your evidence.",
   "Prepare an alternative that lets you step back from danger.",
   "Keep up your basic daily routine so you do not lose heart."
  ],
  "practical": [
   "Do not stand out or voice criticism unnecessarily; conduct yourself with care.",
   "Do not give up your inner purpose and principles; keep them quietly.",
   "Share your true feelings only with people you can trust."
  ],
  "list": {
   "kw": "Hiding your light, patience",
   "meaning": "A bright fire hidden beneath the earth. It means protecting yourself wisely when it is hard to show what is right.",
   "advice": "When the time and place are wrong, you do not need to share every thought. Keep to your inner standards and find a safe way forward.",
   "example": "If the mood at work is against you, avoid emotional clashes, keep records, and talk things over with someone you trust."
  }
 },
 "101001": {
  "name": "Grace (Bi)",
  "keyword": "Adornment",
  "summary": "Polish the outside, but do not lose the substance.",
  "core": "Grace (賁) shows fire lighting up the base of a mountain and making it beautiful, speaking to the value of form and decoration. It helps in small matters, but relying on decoration alone for a big decision is risky, and the finest adornment is said to end in the plainness of undyed white.",
  "situation": "Image, presentations, packaging, and first impressions matter now. Appearance can help, but check at the same time that there is real substance behind it.",
  "example": "If someone preparing for an interview draws this hexagram, grooming yourself and polishing how you speak will help, but in the end your experience and sincerity must be at the center.",
  "actions": [
   "Polish the format of your presentation or documents, but first confirm that the content is well supported.",
   "Compare important choices by their real terms, not by how they look.",
   "Cut back on excess styling and showy spending, and spend your time on what is essential."
  ],
  "practical": [
   "Tidy up how you deliver things and how they look, but check the core content first.",
   "Too much decoration damages sincerity, so keep to a sensible limit.",
   "A simple, honest attitude is the most persuasive of all."
  ],
  "list": {
   "kw": "Adornment and expression",
   "meaning": "Firelight shining at the foot of a mountain. It means that fitting form and graceful expression matter.",
   "advice": "Appearance should help the content come across. Do not get carried away with decoration and lose sight of the essence.",
   "example": "When you write a report, lay it out so it looks good, but make sure the key evidence and conclusion are clear."
  }
 },
 "101010": {
  "name": "After Completion (Ji Ji)",
  "keyword": "Completed and in order",
  "summary": "It is accomplished; stay alert, because order can easily slip.",
  "core": "After Completion (旣濟) shows water and fire each in its place and working in harmony, with the crossing already made. Small matters go well, but things tend to start well and end in disorder, so think ahead about trouble and prepare for it. Just as a simple, sincere offering earns more blessing than a lavish one, keep to substance over show.",
  "situation": "You have reached a goal or a stable stage. Settling into the achievement lets gaps open up, so upkeep and regular checks are the key.",
  "example": "If someone who has just reached the position they wanted draws this hexagram, it means not to rest on the achievement. Check ahead of time for new responsibilities and risks, and keep to the basics, since that is what lasts.",
  "actions": [
   "Write down three risks you expect after reaching your goal and make a plan for each.",
   "Set a regular check-in schedule and review your rules and structure.",
   "Share the achievement, but cut back on showing off and spending that invite complacency."
  ],
  "practical": [
   "Build a plan for maintaining results and a system for checking them.",
   "Fix small cracks and slack early.",
   "Focus on substance and sincerity rather than flashy display."
  ],
  "list": {
   "kw": "Complete, now maintain it",
   "meaning": "Water sits above fire, and the two work on each other in just the right way. It means a matter is finished and in good order.",
   "advice": "Completion is not the end but the start of upkeep. Keep checking so small slips do not grow again, and get ready for the next change.",
   "example": "When a project is done, review the results, set up an operations and maintenance plan, and name who will follow up."
  }
 },
 "101011": {
  "name": "The Family (Jia Ren)",
  "keyword": "Home and close community",
  "summary": "Set your own household right; consistent words and deeds build trust.",
  "core": "The Family (家人) shows wind coming out of fire, the way order that begins inside the home spreads outward. Words should have substance and actions should be consistent, and order in a household comes from dignity and honest trust. When each person fulfills their own role, the home is at peace.",
  "situation": "Order within family, close relationships, or your own team matters now. It is a good time to focus on building trust and rules at home rather than on outside affairs.",
  "example": "If someone with frequent family conflict draws this hexagram, the place to start is not trying to change the other person. Make your own words and actions consistent, and sort out roles and rules together.",
  "actions": [
   "Decide on roles and rules together with your family or team, and share them.",
   "Clear up misunderstandings that came from words and actions not matching.",
   "Tell the people close to you, in specific terms, that you appreciate and recognize them."
  ],
  "practical": [
   "Speak to those close to you with more courtesy, and keep your promises.",
   "Divide household chores and roles fairly.",
   "Keep a balance between dignity and warmth."
  ],
  "list": {
   "kw": "Home and inner order",
   "meaning": "The image of wind and fire, standing for the roles, rules, and responsibilities within close relationships and communities.",
   "advice": "The closer the relationship, the more it needs promises and respect. Make roles clear and let your words match your actions.",
   "example": "For recurring conflict in a family or team, sit down together and sort out who handles what and what each person expects."
  }
 },
 "101100": {
  "name": "Abundance (Feng)",
  "keyword": "Peak abundance",
  "summary": "At the height of fullness the sun begins to set; stay modest.",
  "core": "Abundance (豐) joins thunder and lightning to mean a great and bright peak. It says not to worry and to shine widely, like the sun at midday, yet you must know that the sun declines once it reaches noon and the moon wanes once it is full. The more so at such a time, judge matters fairly and set things in order.",
  "situation": "Results, scale, and reputation are reaching their peak. In good times, stay fair and humble, and prepare for the next phase.",
  "example": "If someone whose business has reached its peak draws this hexagram, it means not to settle into today's success. Prepare ahead with fair management, reserves, and the next engine of growth.",
  "actions": [
   "Check the structure and rules you need to sustain your current growth.",
   "Prepare a backup business or emergency funds for after the peak.",
   "Share your success modestly so you reduce envy and misunderstanding around you."
  ],
  "practical": [
   "Share results openly and keep to fair principles.",
   "Cut waste and build reserves while times are plentiful.",
   "Do not get carried away by the glitter; check what is essential."
  ],
  "list": {
   "kw": "Abundance at its peak",
   "meaning": "Thunder and fire together, appearing bright and large. It means a time when results and vitality reach their height.",
   "advice": "Even in a time of plenty, do not assume it will last forever. Enjoy your results while preparing for the next change, and write down what matters most.",
   "example": "When business is going well, set aside part of the profit and strengthen your systems and staff to prepare for swings."
  }
 },
 "101101": {
  "name": "The Clinging (Li)",
  "keyword": "Clarity and attachment",
  "summary": "Attach yourself to what is right and shine; clarity needs a good support.",
  "core": "The Clinging (離) means fire and brightness, and also clinging to something and relying on it. Fire burns only when it clings to fuel, so you become bright only by relying on the right purpose and the right people, and a gentle heart, like caring for a cow, helps. Lamenting instead of singing as the sun sets shows a lack of wisdom about timing, so accepting decline is also part of the task.",
  "situation": "Understanding, insight, honor, and visibility are in the spotlight. Depending on what you rely on, brightness can turn into burnout, so check that your foundation is sound.",
  "example": "If a creator who has just started getting attention draws this hexagram, it means not to depend on popularity alone. Build a base of content that earns steady trust, and prepare for the time when the attention cools.",
  "actions": [
   "Write down the core abilities that your reputation and brightness rest on.",
   "Make an energy management plan so excess passion does not burn you out.",
   "Start now preparing for your successor or the next generation."
  ],
  "practical": [
   "Check whether the things you rely on, such as knowledge, information, and people, are sound.",
   "Be gentle and mild, and stay in harmony with those around you.",
   "When you see signs that your peak is passing, prepare calmly."
  ],
  "list": {
   "kw": "Brightness and reliance",
   "meaning": "Fire doubled. It means shining clearly and discerning well, and relying on a sound foundation the way fire relies on fuel.",
   "advice": "Bring the facts to light, but do not flare up emotionally. Ability and reputation need a base that keeps supporting them.",
   "example": "In presentations and judgments, lay out your evidence clearly, and line up the data and people who can check your thinking."
  }
 },
 "101110": {
  "name": "Revolution (Ge)",
  "keyword": "Radical change",
  "summary": "Change the old when the time is ripe and trust has been built.",
  "core": "Revolution (革) shows lake and fire clashing so that things are transformed, speaking of radical change. As the saying that trust comes only after the appointed day suggests, both timing and trust must be in place, and change made with a just cause and in line with the natural order leaves no regret. A distinction is made too: the superior person changes as clearly as a leopard's coat, while the petty person only changes his face.",
  "situation": "A big change is needed, such as a job move, restructuring, or resetting a relationship. Rushing brings strong backlash, while enough preparation and a sound reason lead to success.",
  "example": "If someone planning to change companies or switch careers draws this hexagram, it means not to decide on impulse. Prepare well, have a sound reason, and carry out the change boldly when the time is right.",
  "actions": [
   "Decide the timing and stages of the change, and make a schedule.",
   "Explain the change in advance to the people it will affect, and listen to their views.",
   "Set check-in points until the new way is firmly in place."
  ],
  "practical": [
   "Clearly state the reason and goal of the change, and share them.",
   "Build trust and a foundation before any sudden change.",
   "Do not change only the surface; make real changes in practice."
  ],
  "list": {
   "kw": "Reform and transformation",
   "meaning": "Lake and fire meeting. It means a time when the old way no longer fits and change and reform are needed.",
   "advice": "Even when change is needed, be clear about the reason and the timing. With enough buy-in and evidence, the change settles in steadily.",
   "example": "To change an old procedure, explain the problem and the expected improvement, and begin with a small trial run."
  }
 },
 "101111": {
  "name": "Fellowship with Men (Tong Ren)",
  "keyword": "Fellowship",
  "summary": "Join hands openly with like-minded people for a shared cause, not for private gain.",
  "core": "Fellowship with Men (同人) shows fire burning brightly under the sky, as people come together in an open place. Join forces through fairness and a broad mind, not private ties or cliques, and while looking for what you have in common, distinguish and respect your differences.",
  "situation": "This suits situations where many people share a goal, such as collaboration, group activities, or joint projects. If you guard against taking sides and a closed atmosphere, even big things can be achieved together.",
  "example": "If someone running a study group or club draws this hexagram, it means not to gather around close friends. Set clear shared goals and rules, and run it as an open group.",
  "actions": [
   "Agree in advance with your partners on roles and how benefits will be divided.",
   "Keep communication transparent so that small factions or private interests do not form.",
   "Keep the door open to new people and outside opinions."
  ],
  "practical": [
   "Share your common goals and standards clearly, in writing or in speech.",
   "Avoid looking after only your close friends, and treat people with an open mind.",
   "Even when opinions differ, first confirm your shared purpose."
  ],
  "list": {
   "kw": "Shared purpose",
   "meaning": "Heaven and fire lighting things together, standing for working with people around a common aim.",
   "advice": "Put a shared goal ahead of private gain. Treating all kinds of people fairly widens the reach of your cooperation.",
   "example": "In a cross-department project, set common success criteria and share information and credit openly."
  }
 },
 "110000": {
  "name": "Approach (Lin)",
  "keyword": "Approaching and growing",
  "summary": "A growing time; approach with care and keep your guard up even as you succeed.",
  "core": "Approach (臨) is the image of someone above drawing near to those below, looking after them and guiding them. Energy is growing and things are moving forward. Teaching and tolerance should have no limit, but remember that decline already hides inside prosperity, so guard against it early.",
  "situation": "This is a time when your influence, opportunities, or the number of people around you are growing. You are asked to care for others and teach them up close, and to check whether your foundation is keeping pace with how fast you are growing.",
  "example": "If someone who has just been put in charge of new hires receives this hexagram, it means that watching closely, teaching, and being inclusive will work better than simply giving orders.",
  "actions": [
   "Set aside time for one-on-one conversations with the people in your new role.",
   "Check that your staff, funds, and rules are keeping pace with how fast you are expanding.",
   "Prepare one backup plan for the day this upward run slows down."
  ],
  "practical": [
   "When dealing with people, go to them in person, listen, and help.",
   "In a growth phase, build up both your people and your systems together.",
   "Stay humble when things are going well, and prepare for the risks that come later."
  ],
  "list": {
   "kw": "Drawing near, caring",
   "meaning": "The earth sits close above the lake. People or opportunities are coming toward you, and a leader pays attention to what is happening on the ground.",
   "advice": "Respond actively when an opportunity arrives, but do not let your guard down. Get close, listen, and provide the support that is needed.",
   "example": "A manager should see the work site firsthand, listen to the team's difficulties, and arrange practical support."
  }
 },
 "110001": {
  "name": "Decrease (Sun)",
  "keyword": "Reducing",
  "summary": "Cutting back (desires, anger, waste) turns out to be a gain.",
  "core": "Decrease (損) is the image of taking water from a lake to make the mountain higher. Hold back anger, block greed, cut down on formality, and keep what is sincere, and the outcome is greatly auspicious. As the saying goes, even a simple offering of two small bowls is enough: giving things up becomes a form of devotion in itself.",
  "situation": "This is a time to cut back on excess in spending, schedule, relationships, and emotions. If sincerity remains even when you have less, stability and benefit tend to follow.",
  "example": "If someone whose spending has grown and whose finances feel shaky receives this hexagram, it means the quickest path to stability is cutting unnecessary and showy spending rather than struggling to earn more.",
  "actions": [
   "Pick three expenses and commitments to cut this month, and follow through.",
   "Sort out excessive expectations and hurt feelings in a relationship, and talk about them honestly.",
   "Share something you can spare to help others, even if it is small."
  ],
  "practical": [
   "Clear out unnecessary spending and commitments.",
   "When anger or greed rises, pause for a beat before you express it.",
   "Treat your relationships with sincerity rather than formality."
  ],
  "list": {
   "kw": "Cutting back, restraint",
   "meaning": "A lake lies beneath a mountain. It points to the wisdom of weighing loss and gain, and of reducing one thing to preserve another that matters more.",
   "advice": "Rather than sacrificing blindly, be clear about what to cut and what to protect. Restraint that is voluntary and has a purpose helps.",
   "example": "If you are short on time, cut back on less important appointments and give that time to your health or your key task."
  }
 },
 "110010": {
  "name": "Limitation (Jie)",
  "keyword": "Healthy limits",
  "summary": "Proper limits create freedom and make things last.",
  "core": "Limitation (節) is the image of setting rules and restraint, as a lake sets a limit on how much water it holds. Restraint that is painfully harsh cannot last long. On the other hand, restraint so extreme that you will not even step outside the door misses the moment and brings misfortune. A fitting measure of restraint that you can enjoy is auspicious.",
  "situation": "This is a time to set standards for spending, time, emotions, and energy. Rules are needed, but they only work when they are at a level you can actually keep.",
  "example": "If someone who has just started a diet or a saving plan receives this hexagram, it means that overly strict rules will not last, so you should set a realistic limit that you can keep up while enjoying yourself.",
  "actions": [
   "Set limits for your spending and time use this month, and write them down.",
   "Adjust rules that are too strict to keep, so that they become realistic.",
   "Write the purpose of your restraint in one line, and check it from time to time."
  ],
  "practical": [
   "Set rules and limits at a level you can keep.",
   "Stay flexible enough to step outside the door and act when you need to.",
   "Think of restraint as a tool for keeping going, not as a way to punish yourself."
  ],
  "list": {
   "kw": "Limits, moderation",
   "meaning": "This is the image of water being regulated to the right amount. It means the restraint of setting limits and using resources fittingly.",
   "advice": "Rules help when they can be sustained. Too many restrictions feel suffocating, so set standards that fit reality.",
   "example": "When managing a budget or schedule, separate what is essential from what is optional, and set a limit you can keep."
  }
 },
 "110011": {
  "name": "Inner Truth (Zhong Fu)",
  "keyword": "Sincere trust",
  "summary": "Sincerity and reliability are your greatest strength.",
  "core": "Inner Truth (中孚) is the image of wind blowing over a lake: the inside is empty, so it is filled with a sincere heart. When trust runs deep, even pigs and fish respond, and just as a calling crane is answered by its young, sincerity reaches the other person. Like carefully deliberating a trial and delaying an execution, dealing with people calls for caution and leniency.",
  "situation": "This is a time when trust and genuineness decide the outcome. Honesty and diligence move a relationship more than skill and calculation do.",
  "example": "If someone with a trust problem with a customer or partner receives this hexagram, it means that restoring trust through heartfelt communication and keeping your promises is more effective than a technical explanation.",
  "actions": [
   "In a relationship where trust has been shaken, be the first to offer a sincere explanation and apology.",
   "Make only promises you can keep, and be sure to follow through.",
   "Have an honest conversation with someone you can trust."
  ],
  "practical": [
   "Keep your promises and your word to build trust.",
   "Think carefully about the other person's situation and be generous.",
   "Show your sincerity through steady action."
  ],
  "list": {
   "kw": "Sincerity, trust",
   "meaning": "This is the image of wind moving over a lake. The truth inside your heart reaches outward and creates trust.",
   "advice": "Make your words and actions match, and keep your promises. Trust does not come from demanding it; it is built through repeated action.",
   "example": "In a negotiation, do not pretend to know what you do not. Explain honestly what is possible and what is difficult."
  }
 },
 "110100": {
  "name": "The Marrying Maiden (Gui Mei)",
  "keyword": "A hasty, ill-fitting move",
  "summary": "Feelings drive you but your position is not secure; rushing leads to trouble.",
  "core": "The Marrying Maiden (歸妹) is the image of a young woman going to her husband's home, and marriage carries the great meaning of being both the beginning and the end of people, in which heaven and earth interact. However, you are moved by joy and feeling, your position is not fitting, and the yielding is riding on top of the firm. So rushing ahead brings misfortune and nothing is gained. First consider whether the end can last forever, and what the drawbacks of this relationship are.",
  "situation": "This is a time when a relationship or contract entered on impulse, or a partnership with an unclear status, can become a problem. Before passion, you need to make responsibilities and terms clear.",
  "example": "If someone about to start a business partnership because of the mood of the moment receives this hexagram, it means that rather than going ahead carried away by enthusiasm, you should first set out shares, roles, and exit conditions clearly.",
  "actions": [
   "Write down how a new relationship or contract might end and what its risks are.",
   "Put off hasty decisions and listen to objective opinions from people around you.",
   "Settle any unclear position or role by agreement, so that it is clear."
  ],
  "practical": [
   "Put the terms and responsibilities of anything begun out of feeling or goodwill into writing.",
   "In a relationship, make each person's position and expectations clear.",
   "Think first about what your present choice will lead to in the long run."
  ],
  "list": {
   "kw": "Order and caution in relationships",
   "meaning": "With thunder over the lake, it warns against situations where the heart runs ahead, or where the order and terms of a relationship do not fit.",
   "advice": "Do not rush things just because you want them. Check that each person's role, the promises made, and the long-term outcome are in balance.",
   "example": "In a contract or relationship formed in a hurry, make the terms and responsibilities clear and give yourself enough time to think."
  }
 },
 "110101": {
  "name": "Opposition (Kui)",
  "keyword": "Estrangement",
  "summary": "People drift apart; accept differences and begin with small shared things.",
  "core": "Opposition (睽) is the image of fire flaring upward and a lake seeping downward, each heading in the opposite direction. Purposes drift apart and suspicion and misunderstanding arise, so you need the wisdom to see difference within sameness. Big undertakings are hard, but small matters go well, and once the misunderstanding clears, it is resolved like falling rain.",
  "situation": "This is a time when differences of opinion, distrust, and misunderstanding stand out in relationships. It is better to begin with small acts of cooperation than to rush for a big agreement.",
  "example": "If someone who keeps clashing with a coworker over working styles receives this hexagram, it means that instead of trying to persuade, you should accept your differences and start by working in step on small tasks.",
  "actions": [
   "Set up a time to talk directly about where the misunderstanding arose.",
   "If a big agreement is hard, settle a small joint task first.",
   "While emotions are running high, put off judgments and conclusions."
  ],
  "practical": [
   "Before doubting the other person's position, check the facts.",
   "See differences not as weaknesses but as a chance to complement each other.",
   "Rebuild trust by creating experiences of cooperation in small matters."
  ],
  "list": {
   "kw": "Difference, divergence",
   "meaning": "Like fire going up and water going down, the two look in different directions. Differences and misunderstandings can arise.",
   "advice": "Rather than trying to make everyone the same, tell common ground apart from differences. Starting with small agreements opens the way to cooperation.",
   "example": "With a coworker who disagrees with you, first confirm the final goal, then look for what can be adjusted within each person's approach."
  }
 },
 "110110": {
  "name": "The Joyous (Dui)",
  "keyword": "Joy and communication",
  "summary": "Share real joy and beware of flattery.",
  "core": "The Joyous (兌) is the image of two lakes joined together, enriching each other, as friends study together and take delight in it. The joy of harmony is auspicious, but you should be wary of joy won by flattery and of the pleasure of drawing others in. An upright and sincere heart is the foundation of joy.",
  "situation": "This is a time when conversation, gatherings, and learning become lively. Because the mood is so good, you need a center that is not shaken by sweet words and self-interest.",
  "example": "If someone who is excited about a widening circle of contacts receives this hexagram, it means that you should keep up the enjoyable exchanges, but not be swept along by words and profit, and tell apart the relationships that are sincere.",
  "actions": [
   "Set up a study group or conversation circle and talk regularly.",
   "If someone makes a sweet offer, check the conditions behind it.",
   "Reflect on whether the way you bring joy to those around you is genuine."
  ],
  "practical": [
   "Build up joy by learning and talking with friends and coworkers.",
   "Tell praise from flattery, and speak from the heart.",
   "Do not give up your principles for the sake of pleasure."
  ],
  "list": {
   "kw": "Joy, conversation",
   "meaning": "This is the image of lakes doubled. It stands for joy, exchange, and sharing your heart through words.",
   "advice": "Pleasant conversation keeps a relationship alive, but flattery and careless promises can damage trust. Protect both joy and honesty.",
   "example": "Keep the mood of collaboration good, but handle hard problems in honest and respectful words."
  }
 },
 "110111": {
  "name": "Treading (Lu)",
  "keyword": "Walking carefully",
  "summary": "You are walking near danger; courtesy and careful steps keep you safe.",
  "core": "Treading (履) means to step and walk. As in the saying that you can step on a tiger's tail and not be bitten, this hexagram is about avoiding harm through courtesy and caution even when danger is close. The key is to discern the proper roles of those above and below, and to act in keeping with your own place.",
  "situation": "It fits situations that call for handling delicate relationships, such as with a superior, a difficult person, or a formal occasion. Manner and order, more than courage, decide the result.",
  "example": "If someone who has met a difficult boss at a new job receives this hexagram, it means that the safest and wisest course is to build trust by carefully keeping to courtesy and the reporting line, rather than confronting the boss.",
  "actions": [
   "Before an important meeting or negotiation, first learn the other person's point of view and what is off limits.",
   "Avoid overestimating your abilities and overstepping a line.",
   "If you sense danger, prepare a detour and a buffer instead of charging straight ahead."
  ],
  "practical": [
   "Keep to a manner of speaking and procedures that respect the other person's position and standpoint.",
   "When you are unsure of the situation, hold back and observe from a step behind rather than going first.",
   "The basics, such as promises, punctuality, and courtesy, are what build trust."
  ],
  "list": {
   "kw": "Courtesy, careful conduct",
   "meaning": "With Heaven above the lake, it means passing through a dangerous or difficult situation carefully and with courtesy.",
   "advice": "Respect the other person's position and the rules, and be careful in what you say and do. Courage is not the same as recklessness.",
   "example": "When you have an important conversation with a superior, present your prepared evidence calmly and also consider the other person's face."
  }
 },
 "111000": {
  "name": "Peace (Tai)",
  "keyword": "Harmony and flow",
  "summary": "Above and below connect well; use the good time to build, and do not get careless.",
  "core": "Peace (泰) shows Heaven's energy coming down and Earth's energy rising so the two meet and exchange. Communication and harmony let things go well. But nothing stays level forever without tilting, so the lesson of this hexagram is not to let your guard down when things are going smoothly.",
  "situation": "Something that was stuck in your relationships, work, or finances starts to loosen, and cooperation comes easily. Use this flow to carry out what you have put off, but be wary of too much optimism.",
  "example": "Say someone received this hexagram after a long conflict, just as a mood of reconciliation appeared. It can be read as: do not miss this good moment, turn the agreement into concrete promises, and do not be overconfident.",
  "actions": [
   "Push forward an important proposal or negotiation that you have been putting off.",
   "While things are smooth, check for small gaps that could grow into problems.",
   "Stay humble even when results come, and plan the next step."
  ],
  "practical": [
   "Make active use of chances for cooperation and conversation.",
   "Build your foundation in good times and set aside some reserve for a crisis.",
   "Thank the people who helped you and share the results with them."
  ],
  "list": {
   "kw": "Open communication, calm ease",
   "meaning": "Earth's energy and Heaven's energy move back and forth between each other. Those above and below communicate, and things tend to go fairly smoothly.",
   "advice": "Do not take the good flow for granted. Keep tending your relationships and your foundation, and prepare for the next change while things are going well.",
   "example": "When the team mood is good, share information and settle conflicts early to keep your results steady."
  }
 },
 "111001": {
  "name": "Great Accumulating (Da Chu)",
  "keyword": "Storing up great strength",
  "summary": "Build up ability and character before a big move.",
  "core": "Great Accumulating (大畜) shows a mountain holding Heaven's energy within it. It is the hexagram of learning widely from the words and deeds of the past and building up virtue. 'Good fortune even when not eating at home' means the time to use your abilities in the world is near. When you use your stored strength in the right direction, you can cross even great difficulties.",
  "situation": "Learning, building a career, and stocking up resources matter now, and a chance to show your ability is likely to come soon. Do not rush. Prepare well first, then move forward.",
  "example": "Suppose someone studying for a career change received this hexagram. It means: rather than applying in a hurry, keep building the skills you need and seize a big opportunity once you are ready.",
  "actions": [
   "Choose one skill to build with focus over the next year.",
   "Put what you learn into practice, even on a small scale, to test it.",
   "Get your portfolio and contacts in order so you can move at once when a chance comes."
  ],
  "practical": [
   "Gather knowledge and experience widely, then add depth.",
   "Use your abilities for honest work and aim to contribute to the world.",
   "Invest in long-term skill rather than immediate results."
  ],
  "list": {
   "kw": "Great stored strength, self-cultivation",
   "meaning": "A great mountain holds the power of Heaven. It means building up knowledge, ability, and resources on a large scale while waiting for the right time.",
   "advice": "Build long-term capability rather than chasing immediate results. The stronger you become, the more you need a clear standard for using that strength well.",
   "example": "In a period of building expertise, accumulate study, experience, and records, and take on the challenge when you are ready."
  }
 },
 "111010": {
  "name": "Waiting (Xu)",
  "keyword": "Waiting while preparing",
  "summary": "The time is not ripe yet; keep your routine and prepare instead of forcing a result.",
  "core": "Even if you want something, the result is unlikely to come right now. But if you treat this as a time for preparing and building up rather than simple delay, what follows can turn out much better.",
  "situation": "This often appears when you are waiting on an outcome, such as an acceptance, a reply, a contract, progress in a relationship, or the return of an investment. Pushing hard for a conclusion can instead upset the flow.",
  "example": "If this hexagram came up while you were waiting for interview results, the move that really uses your luck is to prepare for the next interview or improve your portfolio, rather than anxiously checking for news.",
  "actions": [
   "Until the set date, focus on preparing instead of pressing for an answer.",
   "Do not repeat unnecessary contact or interference out of anxiety.",
   "Do not waste the waiting period, and make a backup plan as well."
  ],
  "practical": [
   "While you wait, fill in the materials or skills you are missing.",
   "Do not jump to a negative conclusion just because the other side has not responded.",
   "Tell apart matters that need time from matters that need action right away."
  ],
  "list": {
   "kw": "Waiting while preparing",
   "meaning": "Water sits above Heaven. You have a destination, but conditions are not ripe yet, so it is a time to wait and prepare.",
   "advice": "Waiting does not mean sitting idle. Watch for risks and prepare your resources and information while you wait for the right moment.",
   "example": "If a contract or job change is ahead, gather the documents you need to check and do not rush until the terms are clear."
  }
 },
 "111011": {
  "name": "Small Accumulating (Xiao Chu)",
  "keyword": "Small gains, gentle restraint",
  "summary": "Progress is slow and modest; keep building small things steadily.",
  "core": "Small Accumulating (小畜) describes a situation where something small briefly holds back and gathers something large. Like clouds that are thick but have not yet released rain, the conditions are coming together, but it is too early for results to burst forth. For now it is a time to refine your skills and cultivation (文德, the virtue of learning and refinement).",
  "situation": "Things are not going the way you want and it feels frustrating, but the direction itself is not bad. It is better to build small results and trust than to launch something big.",
  "example": "Suppose someone who has started studying for a certificate or a side business received this hexagram. It can be read as: rather than expecting quick income or a pass notice, this is a time to keep steadily building small skills and a track record.",
  "actions": [
   "Break a big goal into small steps and check on them every week.",
   "Spend your time filling in the skills or materials you lack right now.",
   "Do not blow up over hurt feelings or frustration. Sort them out and then say them calmly."
  ],
  "practical": [
   "Keep going by recording small habits and small wins.",
   "Even without results yet, do not impatiently shake up the whole situation.",
   "Soften your words and manner to win cooperation from those around you."
  ],
  "list": {
   "kw": "Small gains, gentle restraint",
   "meaning": "Wind passes over Heaven and gathers the great flow a little at a time. It is a time for small preparations and restraint rather than big results.",
   "advice": "Rather than pushing hard right now, build up resources and skill bit by bit. Do not force your way through small obstacles.",
   "example": "If you have started saving or studying, build a small habit you can keep every day instead of setting an overreaching goal."
  }
 },
 "111100": {
  "name": "Great Strength (Da Zhuang)",
  "keyword": "Great power",
  "summary": "You are strong; restrain that force with courtesy and rightness.",
  "core": "Great Strength (大壯) shows yang energy growing strong, like thunder sounding high in the sky. The stronger you are, the more you need the restraint of not stepping on anything improper. Like a ram that gets its horns stuck in a fence and cannot get free, relying on force alone and pushing ahead leads you into trouble.",
  "situation": "Your drive, confidence, and influence have grown. Moving fast is fine, but if you ignore the people around you and your principles, you will instead be blocked.",
  "example": "Imagine a sales team leader with strong results and rising confidence who received this hexagram. It means they can keep expanding aggressively, but lasting results are possible only if they keep their courtesy and principles toward colleagues and customers.",
  "actions": [
   "Check your schedule and resources for anything that is moving too fast.",
   "Set up a time to hear the objections and worries of the people around you.",
   "Before making a big decision, check once more that it does not go against your principles."
  ],
  "practical": [
   "When you have power, follow rules and courtesy even more strictly.",
   "Give strong opinions gently, along with your reasons.",
   "Even if you could solve something by force, put discussion first."
  ],
  "list": {
   "kw": "Strong momentum, self-restraint",
   "meaning": "Thunder sounds high in the sky. Strength and drive are growing, but that strength must be used rightly.",
   "advice": "Even as your confidence grows, do not overstep the rules or the other person's rights. Restrain yourself to serve your purpose instead of proving your strength.",
   "example": "Even if you have the upper hand in a negotiation, look for a lasting agreement instead of pressing the other side."
  }
 },
 "111101": {
  "name": "Great Possession (Da You)",
  "keyword": "Great abundance",
  "summary": "You hold much; stay modest and use it rightly.",
  "core": "Great Possession (大有) shows the sun high in the sky shining on all things. It is a time when much gathers, such as wealth, position, and ability. When you use what you have rightly, with an attitude of holding back evil and lifting up good, you receive help from Heaven. Pride makes you more likely to lose it.",
  "situation": "Your results, recognition, and resources are growing. At such a time, how you share and manage what you have matters more than getting more.",
  "example": "Suppose someone whose business has started doing well received this hexagram. It means that rather than being absorbed in expansion, sharing profits with employees and partners and strengthening the finances is the way to last.",
  "actions": [
   "Decide what your growing resources are for, and check for waste.",
   "To ease envy and jealousy around you, be generous with credit and praise for others.",
   "In good times, put effort into long-term investment and developing talent."
  ],
  "practical": [
   "Do not keep the results to yourself. Share them with the people who worked with you.",
   "Do not show off your power or wealth. Carry yourself humbly.",
   "Update your management systems to match your greater responsibility."
  ],
  "list": {
   "kw": "Abundance, great achievement",
   "meaning": "Fire shines brightly above Heaven. It stands for a rich state where talent, resources, and opportunities gather.",
   "advice": "Do not stop at boasting about your results. Use them responsibly. Abundance lasts only with sharing and restraint.",
   "example": "When results are good, give profits back to the team instead of keeping them, and invest in a long-term foundation."
  }
 },
 "111110": {
  "name": "Breakthrough (Guai)",
  "keyword": "A decisive break",
  "summary": "Resolve it decisively, but with caution and restraint.",
  "core": "Breakthrough (夬) is like water in a lake rising to the sky until the dam bursts. It shows a decisive removal of the one remaining yin line (a petty person). Carry it out by announcing it openly and in a legitimate way. Relying on force alone does not pay off, and too much haste brings trouble. It also matters to give generously without dwelling on your own virtue.",
  "situation": "It is a time to carry out a long-delayed decision or remove a problem. Secure legitimacy and transparency first, and the aftermath will be smaller.",
  "example": "If someone who needs to deal with a problem employee or an unfair deal received this hexagram, it means handling it openly and firmly, with evidence and proper procedure, without letting it turn into emotional revenge.",
  "actions": [
   "Set a deadline and carry out the decision you have been putting off.",
   "Explain your reasons and plan first to the people likely to push back.",
   "Check your emotions so that firmness does not turn into harshness."
  ],
  "practical": [
   "Before you decide, sort out the facts and evidence thoroughly.",
   "Handle it through an open and fair process.",
   "After deciding, stay humble and do not cling to what you have given."
  ],
  "list": {
   "kw": "Decisive, clear expression",
   "meaning": "A lake sits above Heaven. It means a time to bring built-up problems into the open and decide.",
   "advice": "Resolve the problem you have put off, but do not act out of anger or to show off. State the facts, manage the risks, and decide by the proper procedure.",
   "example": "When fixing a long-standing work problem, state the issues clearly and offer workable alternatives along with them."
  }
 },
 "111111": {
  "name": "The Creative (Qian)",
  "keyword": "Pure creative strength",
  "summary": "Strong initiative and drive; a time to take the lead, with patience and integrity.",
  "core": "Right now the flow calls for setting a clear goal and building the situation yourself instead of waiting passively. But if you rely only on strong drive and go it alone, you may clash with those around you, so it is important to keep both confidence and humility.",
  "situation": "In work, career, and relationships alike, the initiative comes to you. Results come when you set the direction first and push forward responsibly, rather than waiting for someone's permission.",
  "example": "For example, if someone considering a job change received this hexagram, it can be read as: even without perfect certainty, it is good to explore the market actively and state the conditions you want clearly. But leading with demands alone or acting aggressively can spoil the negotiation, so dignity and balance matter.",
  "actions": [
   "Pick the single most important thing today and take the first step right away.",
   "Keep your confidence before you decide, but check once more for missed factors and the views of those around you.",
   "The better things go, the more you should ease your pace and run things so you keep stamina for the long haul."
  ],
  "practical": [
   "Do not put off things where you need to raise your hand first, such as a new proposal, an application, a presentation, or launching a project.",
   "Make the plan big, but break the execution into details to keep it realistic and sustainable.",
   "If you take a leader role, show principle and fairness rather than acting on your own, and trust will follow."
  ],
  "list": {
   "kw": "Creation, taking the lead",
   "meaning": "Heaven doubled. It means strong vitality, creative power, and an attitude of opening your own path.",
   "advice": "Start actively, but do not show off your strength or go it alone. Great things are achieved when ability comes with responsibility.",
   "example": "If you are starting a new business or project, make the goal clear and bring both drive and humility."
  }
 },
 "000000": {
  "name": "The Receptive (Kun)",
  "keyword": "Pure receptivity",
  "summary": "Yielding, supportive strength; support and let things grow instead of pushing to the front.",
  "core": "This hexagram stresses going with the flow, cooperation, patience, and acceptance over pushing hard. Results come from building a solid foundation and supporting people and circumstances, not from rushing ahead.",
  "situation": "This is a time to lay groundwork rather than chase quick results. Taking care of the unseen parts, such as organizing the practical details, mending relationships, steadying body and mind, and reviewing your finances, will help you a great deal later.",
  "example": "If you drew this hexagram about love, it can be read to mean that quietly rebuilding trust and syncing up your daily rhythms comes before persuading the other person or rushing to define the relationship.",
  "actions": [
   "Focus on building a structure that will last, not on results that show right now.",
   "Think through the positions of the people you need to work with, and act in ways that reduce friction.",
   "Put off overreaching expansion and emotional decisions for now, and strengthen your base."
  ],
  "practical": [
   "For now, quietly do the role that is needed and build trust, instead of stepping out front.",
   "In relationships, listening and consideration carry more weight than asserting yourself.",
   "In daily life, steadying the basics matters: home, health, sleep, meals, and the flow of money."
  ],
  "list": {
   "kw": "Acceptance and support",
   "meaning": "Earth is doubled here. It stands for an all-embracing capacity to receive and nurture, and for steady persistence.",
   "advice": "Rather than rushing to the front, observe the situation and do your assigned work step by step. Flexibility is not passivity; it is the strength to keep going.",
   "example": "In teamwork, building the foundation and supporting colleagues, rather than competing for credit, can lead to good results."
  }
 },
 "010001": {
  "name": "Youthful Folly (Meng)",
  "keyword": "Inexperience and learning",
  "summary": "You do not yet see clearly; stay humble, ask a teacher, and learn before acting.",
  "core": "Luck opens up when you admit your own inexperience and ask questions, not when you assume you already know everything. Trying to force control over a situation you don't understand can make it more confusing.",
  "situation": "This is a period when information is lacking or the other person's real intentions are hard to see. The longer you stay in the position of a learner, a beginner, or an explorer, the fewer mistakes you tend to make.",
  "example": "If this hexagram came up before a real estate contract, it can be read to mean that you should learn and check the terms, taxes, location, and loan structure carefully instead of going on instinct, so that you reduce your losses.",
  "actions": [
   "Set aside plenty of time for study, research, and consultation.",
   "Before any important decision, run it past at least one reviewer or adviser.",
   "Don't pretend to know; make a plan to fill the gaps in your knowledge."
  ],
  "practical": [
   "Actively draw on expert advice, the experience of seniors, and verified sources.",
   "Don't skip over what you don't understand; ask clearly.",
   "In relationships, check the facts first instead of jumping to conclusions about a misunderstanding."
  ],
  "list": {
   "kw": "Learning and inexperience",
   "meaning": "Water flows beneath a mountain, a picture of limited experience and an unclear path ahead. Learning and the role of a guide matter here.",
   "advice": "Admit what you don't know and ask. But rather than simply demanding answers, show that you are willing to learn for yourself.",
   "example": "When studying a new field, don't skip the basics; find a trustworthy teacher or source and keep practicing steadily."
  }
 },
 "010111": {
  "name": "Conflict (Song)",
  "keyword": "Dispute and tension",
  "summary": "Disagreement is surfacing; avoid pushing it to the bitter end and look for fair mediation.",
  "core": "This hexagram stands for quarrels, disputes, misunderstandings, and clashes of interest. What matters is not whether you can win but what you protect and how you handle it. Clashing emotionally only adds fatigue, while sorting out the facts and standards works in your favor.",
  "situation": "At work this may show up as a role conflict or blame game; in relationships, as different readings of what was said; with money, as trouble over promises and terms. Right now, sorting out the structure comes before venting feelings.",
  "example": "If you are in friction with your company while leaving a job, it can be read to mean that clearly laying out your working conditions and the scope of your handover works far better than a long, emotional message.",
  "actions": [
   "Don't rush to a conclusion; separate out the issues, the evidence, and the outcome you want.",
   "Use a third channel that can cool emotions, such as a mediator or a senior person.",
   "Don't drag things out for the sake of pride; set a standard for minimizing your losses."
  ],
  "practical": [
   "Instead of fighting over messaging apps, lay out the key issues in a way that leaves a record.",
   "Rather than expressing resentment right away, try writing your position and the other person's as separate statements.",
   "For legal or contractual matters, check the documents instead of guessing."
  ],
  "list": {
   "kw": "Dispute and mediation",
   "meaning": "Heaven and water move in opposite directions. Conflicting interests may lead to a dispute.",
   "advice": "Pushing your own view as the only right one can escalate the conflict. Separate facts from feelings and consider mediation or agreement.",
   "example": "In a workplace disagreement, check the records and the standards, and ask not whether you can win but whether you can resolve it."
  }
 },
 "011101": {
  "name": "The Cauldron (Ding)",
  "keyword": "Refining",
  "summary": "Upgrade what you have into something better; refine it and share it.",
  "core": "Ding (鼎) means a cauldron, a vessel that cooks raw food to feed people and to nourish the worthy. If Revolution is the hexagram of changing the old, the Cauldron is the one that sets up a new order on the changed foundation and steadies it; it carries the sense of putting things in their proper place and holding firm to your mission. Just as a cauldron stands only on balanced legs, balance among ability, people, and environment matters, and taking on more than you can handle ends in disaster, like a broken leg.",
  "situation": "This fits a career upgrade, improving how a team runs, recruiting and developing talent, and setting up a system of self-management. What matters is the judgment to clear out what is stale and choose what to put in, and the priority is to settle positions and roles properly rather than start changes in a hurry.",
  "example": "If an office worker who has done the same job for years and feels stuck drew this hexagram, it means a job change is not the only answer; reorganizing how you work, your personal brand, your expertise, and how you collaborate can lift you to a new level.",
  "actions": [
   "Decide which old but familiar ways you will boldly fix.",
   "Find the point where your current resources can produce the biggest improvement, and focus there.",
   "Accept that decisions that raise your standard come with some discomfort and learning.",
   "Expanding beyond what you can manage is like a broken cauldron leg, so grow step by step to match your abilities and resources."
  ],
  "practical": [
   "If you have real skill, improve the packaging and the way you deliver it too.",
   "When a problem keeps recurring, check whether it is a flaw in structure and method rather than blaming people.",
   "Tidying up the environment that holds you can change your results along with it."
  ],
  "list": {
   "kw": "A new framework, completion",
   "meaning": "A cauldron over fire turns ingredients into new food. It means arranging your resources into something of value.",
   "advice": "Place people and resources well and nurture what is good. Not only the start but also polish and upkeep are important.",
   "example": "To turn several ideas into a real service, assign roles and set up quality standards and a way to run it."
  }
 },
 "010000": {
  "name": "The Army (Shi)",
  "keyword": "Discipline and leadership",
  "summary": "Big goals need clear rules, a just cause, and a leader people can trust.",
  "core": "Shi (師) means an army. Like water gathered within the earth, it is a formation in which the strength of many people is pooled and moves toward one goal. It is favorable only with a just cause and a leader of good character; leading by force tends to leave aftereffects.",
  "situation": "This fits team projects, running an organization, and conflicts in which you must fight a battle. It is a time to ask first whether the fight is justified and you are well prepared, not whether you can win.",
  "example": "If someone who has just become a team lead drew this hexagram, it can be read to mean that making the purpose and rules of the work clear and respecting team members, rather than leaning on performance pressure, leads to stable results.",
  "actions": [
   "Before entering a fight or competition, sort out your cause, your resources, and your criteria for pulling out.",
   "Choose who handles the work by ability and trustworthiness, and once you have handed it over, interfere less.",
   "Even after a win, include sharing the credit and healing the wounds in your plan."
  ],
  "practical": [
   "When leading people, share the reasons and standards clearly rather than just giving orders.",
   "Be strict with the rules but never lose care for your people; that is how trust is built.",
   "Even when confrontation is necessary, set a goal and a deadline so it doesn't become a war of attrition."
  ],
  "list": {
   "kw": "Organization and discipline",
   "meaning": "Water gathers beneath the earth, standing for an organization and leadership in which many people move toward one purpose.",
   "advice": "You need a clear goal and fair rules. A leader should guide through preparation and trust, not by flaunting authority.",
   "example": "If you take charge of a team assignment, make roles, schedule, and decision process clear, and watch the load on each member."
  }
 },
 "000010": {
  "name": "Holding Together (Bi)",
  "keyword": "Union and closeness",
  "summary": "Draw close to trustworthy people and commit sincerely, before it is too late.",
  "core": "Bi (比) is the picture of water soaking into the earth, people leaning on one another and getting along closely. But you shouldn't lean on just anyone; look to the root of things and align with the right people. If you hesitate and miss the moment, regret remains.",
  "situation": "This is a time when who you join forces with matters, as with a partnership, tidying up your relationships, or building cooperation. Stability comes from getting aligned beside someone you can trust, not from trying to solve everything alone.",
  "example": "If someone adjusting to an unfamiliar organization after changing jobs drew this hexagram, it means the best approach is to find a reliable colleague or mentor early and build a base of relationships, not to tough it out alone.",
  "actions": [
   "Pick one or two people you can rely on most right now and share your situation honestly.",
   "If you have a collaboration to propose, don't put it off; reach out first.",
   "Let go of flattering or profit-driven relationships and spend your time on ones that will last."
  ],
  "practical": [
   "Be selective about whom you get close to, and look at values and attitude rather than interests.",
   "The courage to ask for help or to make the first contact opens up relationships.",
   "Even after you become close, keep your boundaries and keep showing sincerity."
  ],
  "list": {
   "kw": "Closeness and cooperation",
   "meaning": "Water soaks into the earth. It means growing close and joining forces on the basis of trust.",
   "advice": "Choose carefully whom to join with, and keep your promises once the bond is formed. Closeness comes with responsibility.",
   "example": "When looking for a new partner, check whether their actions and values fit, not just their words."
  }
 },
 "000111": {
  "name": "Standstill (Pi)",
  "keyword": "Blocked communication",
  "summary": "Things are stuck and people are not connecting; hold your values and wait without forcing.",
  "core": "Pi (否) is the picture of heaven and earth turned away from each other, with exchange cut off. Intentions don't connect and people's hearts drift apart, so forcing things only increases your losses. But a blockage is not permanent; when it ends, it tends to tip over and a time of release can come.",
  "situation": "This is a period when conversation breaks down, effort goes unrecognized, and the surroundings turn unfavorable. At such times it is better to protect your substance and avoid needless clashes than to put yourself on display.",
  "example": "If someone whose proposals keep getting rejected at work drew this hexagram, it means to step back instead of pouring energy into persuasion, reinforce your skills and evidence, and prepare for when the mood changes.",
  "actions": [
   "Put off big decisions and overreaching expansion, and focus on maintaining the status quo.",
   "Note down whether the cause of the blockage lies with you or outside you.",
   "Quietly build up skills, connections, and materials in preparation for when things open up."
  ],
  "practical": [
   "Speak less, and step back from draining arguments and the need for recognition.",
   "Live frugally and conserve your strength and resources.",
   "Stay loyal to a small circle of people who share your aims."
  ],
  "list": {
   "kw": "Blockage and no connection",
   "meaning": "Heaven and earth have drifted apart and communication is cut off. You may see little progress for your effort, or find that your intentions don't get through.",
   "advice": "In a blocked situation, don't push to persuade or expand. Hold on to what is essential, cut needless drain, and watch for the right time.",
   "example": "If conversations keep going wrong, step back for a while and re-examine your goal and how you communicate."
  }
 },
 "001000": {
  "name": "Modesty (Qian)",
  "keyword": "Humility",
  "summary": "Staying humble brings lasting success and respect.",
  "core": "Qian (謙) is the picture of a mountain within the earth, the virtue of having ability yet not showing it off. It is an attitude of taking from where there is much and adding to where there is little, weighing things up and giving fairly, and it is regarded as the hexagram with the fewest flaws among the sixty-four.",
  "situation": "This is a time when your attitude largely decides the outcome for someone with ability or status. Things go smoothly when you listen and help from a low position instead of boasting.",
  "example": "If someone who has just been promoted and now leads a team drew this hexagram, it means that listening to team members' views and helping from a humble position, rather than trying to establish authority, brings trust and results together.",
  "actions": [
   "In your current role, do the work of real help before showing off.",
   "In a conflict, step back first and hear the other person's side.",
   "Don't use modesty as an excuse to dodge responsibility; see through what you take on."
  ],
  "practical": [
   "When you talk about your results, also mention the help of collaborators and circumstances.",
   "Admit honestly what you don't know and show a willingness to learn.",
   "Lower yourself without becoming servile, and say clearly what needs to be said."
  ],
  "list": {
   "kw": "Humility and balance",
   "meaning": "It looks like a high mountain lying beneath the earth. It means the virtue of humbling yourself and keeping balance even when you are capable.",
   "advice": "Humility is not putting yourself down. Build your skills, share the credit, and learn from your shortcomings.",
   "example": "When presenting results, name the contributors too, and look for what to improve instead of defending against criticism."
  }
 },
 "000100": {
  "name": "Enthusiasm (Yu)",
  "keyword": "Joy and preparation",
  "summary": "Positive energy gathers; enjoy it, but prepare ahead.",
  "core": "Yu (豫) pictures thunder rumbling over the earth and waking all things, and it carries the meanings of joy, harmony, and preparing ahead. When the mood is good, people are moved to act, so it is a good time to push things forward, but if you lose yourself in the fun, regret follows.",
  "situation": "Spirits are high and support is gathering, which favors starting something new or bringing people together. At the same time, guard against carelessness and overexcitement, and get your preparations in place first.",
  "example": "Say someone is thrilled because friends and colleagues love their new business idea. This hexagram suggests that instead of riding the mood and rushing, they should get practical things like funds and a schedule ready, which raises the odds of success.",
  "actions": [
   "Make a checklist before you start an important event or project.",
   "If you made a decision while excited, sleep on it for a day and check it again.",
   "Write down just three risks you should prepare for in advance."
  ],
  "practical": [
   "Use the good mood to ask for help and to line up cooperation on your plans.",
   "Don't let the fun make you neglect the preparations for something important.",
   "Accept that rest and joy are also important parts of life."
  ],
  "list": {
   "kw": "Energy and joy with preparation",
   "meaning": "Thunder rumbles up from the earth. It describes a state where people are stirred and things become lively.",
   "advice": "When the mood is good, put an action plan and preparations in place. Don't make promises or waste resources just because you feel excited.",
   "example": "When planning an event, build on the excitement, but settle the schedule, budget, and person in charge ahead of time."
  }
 },
 "011001": {
  "name": "Work on the Decayed (Gu)",
  "keyword": "Repairing what has spoiled",
  "summary": "Old problems have piled up; fix the root causes to renew things.",
  "core": "Gu (蠱) pictures a vessel infested with worms. It marks a time to face a problem that was left to rot and fix it. Be careful both before and after, like thinking things over for three days before a reform begins and watching over it for three days after it ends. Even if the fault goes back to your parents' generation, sort it out with principle, not emotion.",
  "situation": "Long-buried problems come to light in relationships, organizations, habits, or finances. If you don't cover them up and instead sort out the causes and improve things, this becomes a fresh starting point.",
  "example": "Suppose someone takes over a department that has run inefficiently for years. This hexagram says the key is to understand how the problem is built and improve it step by step, rather than blaming whoever came before.",
  "actions": [
   "Pick the oldest problem you have and make a plan to solve it within this month.",
   "Tell the people affected how the change will touch them, and ask for their cooperation.",
   "After fixing it, build a structure that keeps the same problem from coming back."
  ],
  "practical": [
   "List the problems you have put off and write down their causes honestly.",
   "Focus on what can be improved instead of blaming the past.",
   "Before starting a change, decide on a plan and on when you will check progress."
  ],
  "list": {
   "kw": "Repairing what has spoiled",
   "meaning": "Wind is blocked beneath a mountain. It means long-accumulated problems or neglected matters need to be set right.",
   "advice": "Don't cover the problem up. Find the cause and fix it step by step. Don't dwell on blaming past mistakes, and put measures in place to prevent a repeat.",
   "example": "If work keeps getting delayed, don't just blame the person in charge. Review the procedures and structure."
  }
 },
 "000011": {
  "name": "Contemplation (Guan)",
  "keyword": "Observation",
  "summary": "Look widely and reflect on yourself before acting; lead by example.",
  "core": "Guan (觀) pictures looking widely from a high place, and also being seen by others as a model. Like the reverent act of washing your hands before a sacrifice, setting your mind right brings trust. It teaches you to look at your own life and conduct before you look at others.",
  "situation": "This is a time to observe the situation and gather information rather than act right away. It also helps a great deal to check how your own attitude comes across to others.",
  "example": "Suppose someone is choosing a new company to join. This hexagram says not to compare conditions alone, but to watch the company culture and how people behave there, look back at your own standards, and only then decide.",
  "actions": [
   "Observe the situation for a week and keep notes before you make a judgment.",
   "Ask someone you trust for honest feedback about how you come across.",
   "Spend your time reading the overall flow of things rather than stepping in hastily."
  ],
  "practical": [
   "Gather information from several viewpoints before reaching a hasty conclusion.",
   "Check that your words and actions match, and lead by example.",
   "Reflect by your own standards instead of being swayed by how others see you."
  ],
  "list": {
   "kw": "Observation and self-reflection",
   "meaning": "Wind passes over the earth and reaches everywhere. It means stepping back to observe the whole picture and also checking how you appear.",
   "advice": "Look from many angles instead of reaching a conclusion at once. While you observe others, also look at your own attitude.",
   "example": "Before an important choice, listen fully to people on the ground and those affected, and write down your criteria for deciding."
  }
 },
 "000001": {
  "name": "Splitting Apart (Bo)",
  "keyword": "Erosion",
  "summary": "Things are wearing away; do not fight it, stop and protect your foundation.",
  "core": "Bo (剝) is a time when a high mountain is worn away and crumbles on the earth: petty people gain strength while good energy fades. Advancing is not favorable now. Go with the flow of the times, stop, and protect your foundation so it stays solid. As the saying goes, a large fruit is left uneaten and becomes a seed, so hope remains.",
  "situation": "Resources, status, or relationships are shrinking, or people who work against you are gaining the upper hand. Rather than a reckless counterattack or expansion, you need a strategy of deciding what to protect and holding on.",
  "example": "Imagine an organization shaken by poor results. This hexagram says that protecting key people and customers and weathering the storm, instead of expanding aggressively, becomes the base for recovery later.",
  "actions": [
   "Make a list that separates what you will protect from what you will let go.",
   "Put off new investments or expansion, and check your cash flow and your health.",
   "Stay in touch with a trustworthy person who can get through this hard time with you."
  ],
  "practical": [
   "Focus on cutting losses and protecting your key assets and relationships.",
   "Avoid reckless confrontations when the situation is against you.",
   "Quietly preserve the seeds for what comes next, which are your skills and trust."
  ],
  "list": {
   "kw": "Decline and letting go",
   "meaning": "The earth that supports the mountain is being worn away. A foundation may weaken or old things may collapse, so this is a time for defense and clearing out.",
   "advice": "Don't expand beyond your means. Protect the foundation you must keep first. Accept what is hard to maintain and let it go.",
   "example": "If spending has grown and income has dropped, stop new investments and review essential costs and risks first."
  }
 },
 "011110": {
  "name": "Preponderance of the Great (Da Guo)",
  "keyword": "An overloaded beam",
  "summary": "A heavy load strains the structure; an exceptional time calls for a bold, decisive step.",
  "core": "Da Guo (大過) pictures a lake covering a tree so that the ridgepole bends. The center is heavy and both ends are weak, so it is hard to hold up. It calls for the strength to stand alone without fear and to withdraw from the world without distress. When the burden is too great, change your approach, share the load, and reinforce the supports.",
  "situation": "The load of responsibility, work, or emotion is near its limit. Instead of forcing yourself to hold on, find balance through bold restructuring and by asking for help.",
  "example": "Suppose someone has taken on a heavy workload right after changing jobs. This hexagram means that instead of trying to do everything, they should reset their priorities and ask for help to fix how the work is structured.",
  "actions": [
   "Write down everything you are handling and sort it into what to cut, what to share, and what to keep.",
   "Ask someone you trust for help and divide up the roles.",
   "Think big decisions through carefully, but act boldly when the time comes."
  ],
  "practical": [
   "Boldly cut back or share anything that goes beyond what you can handle.",
   "Reinforce your weakened areas first, which are your health and your relationships.",
   "In an emergency, don't cling to your usual way of doing things, and respond flexibly."
  ],
  "list": {
   "kw": "Excess and extraordinary burden",
   "meaning": "The water of a lake presses too hard on the wood. It means a heavy burden or an exceptional situation that ordinary standards can't handle.",
   "advice": "When the problem is big, don't insist on your usual methods. Protect what is essential, share the load, and ask for the help you need.",
   "example": "If too much work has piled on your team, reset priorities and ask for extra authority and resources."
  }
 },
 "010010": {
  "name": "The Abysmal (Kan)",
  "keyword": "Danger upon danger",
  "summary": "Trouble upon trouble; keep your sincerity and flow through it like water.",
  "core": "Kan (坎) means a pit and water, and it describes a situation where hard things keep coming one after another. Just as water fills low places and flows on until it reaches the sea, you get through by keeping your center with a sincere heart. Even in a crisis, you need to cultivate virtue and keep learning the lessons.",
  "situation": "Problems keep coming and it is hard to find a way out. Honesty, steadiness, and calm, rather than clever tricks, are your greatest weapons.",
  "example": "Say someone is hit by money problems and health problems at the same time. This hexagram means that instead of trying to solve everything at once, the way through is to sort out the situation honestly and handle it one step at a time.",
  "actions": [
   "List the problems in front of you one by one and deal with the most urgent first.",
   "If it is too much to carry alone, ask for help from a professional or someone you trust.",
   "Keep the basic rhythm of sleep, meals, and rest so you are ready for when you get worn down."
  ],
  "practical": [
   "The harder the times, the more you should face the situation honestly and not hide it.",
   "Don't try to escape all at once. Cross one stretch at a time.",
   "Build your ability to cope by learning the knowledge and advice you need."
  ],
  "list": {
   "kw": "Danger and deep learning",
   "meaning": "Water appears twice over. It means passing carefully through repeated dangers or hardships without losing your center.",
   "advice": "Don't take danger lightly. Check each step as you go. Instead of freezing in fear, find your way with safeguards and experience.",
   "example": "With money or health issues, don't just stay optimistic. Get professional help and make a realistic plan."
  }
 },
 "001110": {
  "name": "Influence (Xian)",
  "keyword": "Mutual attraction",
  "summary": "Hearts respond to each other; sincerity and openness build real bonds.",
  "core": "Xian (咸) pictures a lake and a mountain exchanging energy, the way people's hearts feel and connect with each other. Response arises when you welcome someone with an empty, open mind. It deepens in stages, rising from the big toe to the calf, the thigh, and the back, so if you stay at a shallow level of feeling, you can be shaken.",
  "situation": "New connections, rapport, and empathy matter now. Openness and sincerity, more than calculation, reach the other person, and that is how a relationship begins.",
  "example": "Imagine you have hit it off with someone you were introduced to. This hexagram means not to rush, to build conversation with an open mind, and to respect the stages by which feelings deepen on both sides.",
  "actions": [
   "Start with a low-pressure conversation with someone you like or want to work with.",
   "If a decision was driven by emotion, check it again after a day.",
   "As a relationship deepens, say out loud what each of you expects."
  ],
  "practical": [
   "Don't try to win. Listen first with an open mind.",
   "Even when your feelings run ahead, respect the other person's pace and boundaries.",
   "Sincerity is conveyed through steady actions more than through words."
  ],
  "list": {
   "kw": "Mutual attraction and response",
   "meaning": "A lake and a mountain influence each other. It means hearts are stirred, and affection and rapport arise between people.",
   "advice": "Pay close attention to how the other person responds, and communicate sincerely. Don't rush into important commitments because of a passing attraction.",
   "example": "When starting a relationship, talk about values, boundaries, and mutual expectations, not just attraction."
  }
 },
 "011100": {
  "name": "Duration (Heng)",
  "keyword": "Perseverance",
  "summary": "Lasting results come from steadiness, with change only where the time requires it.",
  "core": "Heng (恒) pictures thunder and wind helping each other and lasting a long time. Like the way of a married couple, it means a steady, unchanging relationship and attitude. Stand firm and don't change direction, but remember that constancy is not rigidity. It means holding to what is fundamental even while things change. Digging in too deep right from the start brings misfortune.",
  "situation": "This is a time to build up long-term work, relationships, or habits. Choose a way that you can sustain, rather than short-term results, and practice it steadily.",
  "example": "Suppose someone keeps quitting exercise or study after a few days. This hexagram means the key is not to boost motivation but to build a small routine you can sustain and keep it up without fail.",
  "actions": [
   "Choose one habit to keep up, and track it for a month.",
   "In a long-standing relationship, review each other's roles and expectations.",
   "Sort out which parts need to change and which parts should be kept."
  ],
  "practical": [
   "Set up a routine, even for a small task, that you do at the same time every day.",
   "Keep your core principles, but adjust your methods to the situation.",
   "Don't set unrealistic expectations or make heavy demands at the start."
  ],
  "list": {
   "kw": "Persistence and consistency",
   "meaning": "Thunder and wind work together. It means the principles to keep up steadily amid change, and the lasting quality of a relationship.",
   "advice": "Steadiness is not the same as stubbornness. Keep your core principles, but adjust your methods to the situation.",
   "example": "To keep up exercise or study, build a sustainable schedule and a habit of checking in, rather than an overly ambitious plan."
  }
 },
 "001111": {
  "name": "Retreat (Dun)",
  "keyword": "Strategic withdrawal",
  "summary": "Step back at the right time; retreat is not escape but preparation.",
  "core": "Retreat (遯) shows a mountain under Heaven: the mountain stops while the sky recedes, like a wise person stepping back as petty influence rises. Keep a firm distance without hatred, and hold to what is right in small matters. Withdrawing at the right time brings success.",
  "situation": "Fighting back is unlikely to win, or the environment is turning against you. It pays to look at real benefit rather than pride and to keep a sensible distance.",
  "example": "If someone worn down by conflict at work draws this hexagram, it suggests stepping away with dignity and preparing the next move instead of confronting people emotionally.",
  "actions": [
   "Decide how you can create distance from the relationship or task that keeps draining you.",
   "Before leaving, clarify the responsibilities and handover you need to wrap up.",
   "Quietly prepare alternatives and resources for your next opportunity."
  ],
  "practical": [
   "Step back from fights and arguments to save your energy.",
   "Keep a clear boundary without hating or blaming anyone.",
   "Use the time away to regroup and prepare."
  ],
  "list": {
   "kw": "Withdrawal and keeping distance",
   "meaning": "A mountain under Heaven: the wisdom of stepping back from a bad situation to preserve your strength.",
   "advice": "Don't see withdrawal only as defeat. Sometimes you protect more by keeping your distance than you would gain by confronting.",
   "example": "If a conflict has become heated, don't rebut right away; take some time and rework your response strategy."
  }
 },
 "000101": {
  "name": "Progress (Jin)",
  "keyword": "Rising and recognition",
  "summary": "Like a sunrise, you advance and gain recognition by showing your character.",
  "core": "Progress (晉) shows the sun rising over the earth: your abilities are recognized, you move forward and win the trust of superiors. A wise person lets their own bright virtue shine and may be received warmly, as if granted audiences three times in a day, but clinging to petty gain like a greedy rat is dangerous.",
  "situation": "Results are showing and opportunities are opening. You will last longer if you are recognized for real ability while staying humble and honest.",
  "example": "If someone who did well on a project draws this hexagram, it suggests sharing the results honestly and going for a promotion or new role, without keeping all the credit for yourself.",
  "actions": [
   "Summarize your results and create a formal occasion to share them.",
   "Check whether the new opportunities offered to you fit your abilities, then accept.",
   "Don't get carried away by recognition; keep preparing for the next stage."
  ],
  "practical": [
   "Present your results honestly and speak up in the right settings.",
   "Even while being recognized, guard against petty gain and greed.",
   "Balance the trust of your superiors and your colleagues."
  ],
  "list": {
   "kw": "Advancing and recognition",
   "meaning": "The sun rising over the earth: your abilities and results show, and chances to move forward appear.",
   "advice": "Use chances to show your results, but don't lose the trust of those around you. Keep making small steady progress.",
   "example": "Summarize and share your project results, and ask for the resources and cooperation the next stage needs."
  }
 },
 "001010": {
  "name": "Obstruction (Jian)",
  "keyword": "Obstacle ahead",
  "summary": "The road is blocked; stop, reflect, and seek help from friends.",
  "core": "Obstruction (蹇) shows water on a mountain, so the road ahead is blocked and rough. Here you should look for level ground and change direction, reflect on yourself and build character, and work with like-minded people. It is said to be favorable to meet a great person in hardship, so the help of a wise adviser matters.",
  "situation": "Things are stuck and moving slowly. Instead of forcing a breakthrough, check the cause and your own attitude and find helpers, and a way will open.",
  "example": "If someone whose project keeps getting delayed draws this hexagram, it means to stop pushing harder, trace what is blocking you, and adjust course with advice from an experienced person.",
  "actions": [
   "Find two or three detours or alternative methods for the most blocked problem.",
   "Ask for help from people who can solve the problem with you.",
   "Slow down and secure safety instead of forcing ahead."
  ],
  "practical": [
   "Check why you are stuck instead of blaming only outside causes.",
   "Seek advice from a trustworthy friend or mentor.",
   "Write down what you learn from the difficulty and build it up as character."
  ],
  "list": {
   "kw": "Obstacles and a hard road",
   "meaning": "Water above a mountain blocks the way: advancing is hard and obstacles are many, so you need to change direction or seek help.",
   "advice": "Don't insist on a head-on breakthrough. Stop, look at the cause, consult someone experienced, or find a detour.",
   "example": "If the schedule keeps slipping, list the obstacles and separate what you can solve alone from what needs support."
  }
 },
 "010100": {
  "name": "Deliverance (Jie)",
  "keyword": "Release",
  "summary": "Tangles unravel; finish quickly and do not linger in the old trouble.",
  "core": "Deliverance (解) shows thunder and rain arising and tension easing: a blocked matter is resolved and forgiveness becomes possible. If a solution is possible, it is good to act quickly, and you need an attitude that forgives faults and treats mistakes leniently. Like shooting a hawk on a high wall, remove the root obstacle decisively.",
  "situation": "A chance is coming for a long-running problem or conflict to be resolved. After the relief, tidy up leftover feelings and follow-up steps so things don't get tangled again.",
  "example": "If a long-dragging contract issue or misunderstanding looks about to clear, this hexagram suggests wrapping up the agreement promptly and leaving no lingering resentment.",
  "actions": [
   "Pick one solvable problem and finish it within this week.",
   "Be the first to offer words of reconciliation or closure.",
   "After resolving it, set a few simple rules to prevent it from recurring."
  ],
  "practical": [
   "When things loosen, don't put it off; handle it quickly.",
   "Don't hold on to the other person's faults; forgive what can be forgiven.",
   "Remove the root cause, but don't attack the person."
  ],
  "list": {
   "kw": "Release and loosening",
   "meaning": "Thunder and rain together ease the tension: a knotted problem loosens and a chance to lighten your burden appears.",
   "advice": "When a problem loosens, settle what you put off and don't hold a grudge. But do make the terms of the solution clear.",
   "example": "Once a conflict reaches agreement, confirm the schedule and responsibilities and wrap up so the same problem doesn't repeat."
  }
 },
 "011111": {
  "name": "Coming to Meet (Gou)",
  "keyword": "An unexpected encounter",
  "summary": "An unplanned meeting or temptation; deal with it before it grows.",
  "core": "Coming to Meet (姤) shows wind blowing under Heaven, a chance encounter. It is a welcome meeting, but there is a sign of one yin line growing from below, warning that a small temptation can slowly grow large. Look at the nature of the meeting and keep your center so you don't get too close.",
  "situation": "A sudden connection, offer or temptation arrives. It looks small at first but has a large effect once it builds up, so set your standards early.",
  "example": "If someone who suddenly gets an offer on great terms draws this hexagram, it means not to accept out of joy alone but to carefully examine the intentions behind the terms and the long-term effects.",
  "actions": [
   "Give a new relationship or offer an observation period of about a week.",
   "Clearly refuse requests that don't fit your standards.",
   "If you want to continue the relationship, confirm each other's boundaries in writing or aloud."
  ],
  "practical": [
   "With a chance offer or meeting, look at the intentions behind the kindness.",
   "Even a small temptation becomes a habit when repeated, so draw the line early.",
   "Keep your center by making your principles and rules clear."
  ],
  "list": {
   "kw": "Unexpected meeting and temptation",
   "meaning": "Wind meeting under Heaven: an unexpected person or opportunity may appear, but look closely at its influence.",
   "advice": "Don't reject new encounters outright or accept them blindly. Check the conditions and risks behind the first attraction.",
   "example": "If you receive an attractive offer, review the terms and the other party's reliability thoroughly before deciding."
  }
 },
 "000110": {
  "name": "Gathering Together (Cui)",
  "keyword": "Assembling",
  "summary": "People and resources gather; give it a center, order, and preparation.",
  "core": "Gathering Together (萃) shows a lake gathering on the earth, as people and resources come together. A gathering lasts only if there is a right center to rally around, and the bigger the gathering, the more you should prepare weapons and rules for the unexpected. Like a sincere sacrifice, set the purpose and spirit of the gathering rightly.",
  "situation": "People, resources and attention are gathering. The opportunity is big, but conflict and confusion can come with it, so orderly management matters.",
  "example": "If someone at an early startup stage, with investors and talent starting to gather, draws this hexagram, it means to firmly set the organization's core values, rules and crisis plan before expanding the opportunity.",
  "actions": [
   "Before an event or project, prepare a contingency plan and a budget cushion.",
   "Decide on a channel for key people and for collecting representative opinions.",
   "Set regular check-ins and communication time so the group doesn't fall apart."
  ],
  "practical": [
   "Make the group's purpose and rules clear and establish a center.",
   "Give the people who gather roles so they feel involved.",
   "The more people gather, the more you should check for risks."
  ],
  "list": {
   "kw": "Gathering and focus",
   "meaning": "The water of a lake collecting: people and resources come together and a shared purpose can be set.",
   "advice": "Make the group's purpose and center clear. As people gather, you also need responsibility, fair sharing and conflict mediation.",
   "example": "When holding a meeting or event, set the agenda and roles and arrange a way for everyone to take part."
  }
 },
 "011000": {
  "name": "Pushing Upward (Sheng)",
  "keyword": "Gradual rise",
  "summary": "Rise step by step like a growing tree; accumulate small things.",
  "core": "Pushing Upward (升) shows a tree growing upward from within the earth, following its natural course. Gentle virtue builds small things up until they reach great height, and meeting a great person and moving ahead without fear brings great success. The key is rising step by step, not leaping recklessly.",
  "situation": "Promotion, growth and stepwise advancement are possible. Trust built through humility and diligence becomes the driving force of your rise.",
  "example": "If someone about to be promoted draws this hexagram, it means that steadily building up your work and earning your superiors' trust, rather than pushing to impress, leads to a smooth rise.",
  "actions": [
   "Break your goal into stages and list the skills each stage needs.",
   "Politely ask to meet someone who could become an important connection.",
   "Even while climbing, check the balance of your health and relationships."
  ],
  "practical": [
   "Follow the order and the basics, and steadily build small achievements.",
   "Actively look for a superior or mentor who can guide you.",
   "The higher you climb, the more you should strengthen the fundamentals, like roots in the ground."
  ],
  "list": {
   "kw": "Rising and gradual growth",
   "meaning": "A tree growing upward from within the earth: small efforts accumulate and bring development step by step.",
   "advice": "Steady growth works better than a quick leap. Learn, ask for help, and prove your ability one step at a time.",
   "example": "If you are preparing for a promotion or career path, build the needed experience in order and keep a record of your results."
  }
 },
 "010110": {
  "name": "Oppression (Kun)",
  "keyword": "Exhaustion",
  "summary": "Hard and stifling; keep your principles and you will eventually get through.",
  "core": "Oppression (困) shows the water of a lake leaking to the bottom and drying up: a hardship of scarce resources and trust, where no one believes what you say. Yet a great person who stays upright, ready even to give their life to fulfill their purpose, is without blame, and what is needed is action and patience more than words.",
  "situation": "Difficulties continue in finances, relationships and how others judge you. Quiet action and holding your center matter more than excuses or talk.",
  "example": "If someone whose business has become difficult and whose circle's trust is wavering draws this hexagram, it means to win back trust through steady follow-through and honesty rather than excuses, and to endure the hard period.",
  "actions": [
   "List the minimum resources and spending you need right now.",
   "Share your situation with a few trustworthy people and ask for their support.",
   "Briefly write down your plan for after you get through this period."
  ],
  "practical": [
   "The harder the times, the less you should talk and the more you should show through action.",
   "If you don't give up your principles, trust will be restored later.",
   "Conserve the resources you have and focus on the basics."
  ],
  "list": {
   "kw": "Hardship and endurance",
   "meaning": "The water of a lake drying up: a frustrating time when resources and energy are short and words don't get through.",
   "advice": "In hard times, don't try to change things with words alone; focus on what is truly necessary. Ask for help and keep your inner center.",
   "example": "If work or finances are stuck, cut down your priorities and ask a trustworthy person for realistic support."
  }
 },
 "011010": {
  "name": "The Well (Jing)",
  "keyword": "The inexhaustible well",
  "summary": "Tend the source and serve others; a steady source never runs dry.",
  "core": "Jing (井) means a well. A village may change, but its well cannot be moved, just as a basic foundation does not change. A well is valuable when its water is drawn up and shared with people; it is unfortunate if the bucket breaks or the water cannot be brought up. The way of the wise leader is to comfort hard-working people and encourage them to help one another.",
  "situation": "This is a time when a foundation, a body of knowledge, a relationship, or the source of a community needs steady care. If you only draw from it and never refill it, it can run dry.",
  "example": "If someone known for their expertise receives this hexagram, it means: do not just draw on your knowledge. Keep learning, share what you know with junior colleagues, and keep the source clear.",
  "actions": [
   "Write down which core skills are the source of your work.",
   "Pick one thing you can share with someone who needs it, and do it.",
   "If an old method or tool has reached its limit, repair or replace it."
  ],
  "practical": [
   "Keep tending and checking your key assets and basic skills.",
   "Share the knowledge and resources you have built up with others.",
   "Check regularly that your tools and methods are not breaking down."
  ],
  "list": {
   "kw": "Shared resources, the basics",
   "meaning": "The image of a well with water in it. It stands for a shared resource that keeps helping people, and for basics that do not change.",
   "advice": "Look after your foundation and keep it fair and open to everyone. Even a good resource loses its use if no one tends it.",
   "example": "Do not keep the team's knowledge and materials with one person. Organize them, share them, and update them regularly."
  }
 },
 "001001": {
  "name": "Keeping Still (Gen)",
  "keyword": "Stillness",
  "summary": "Stop when it is time to stop and go when it is time to go.",
  "core": "Gen (艮) shows mountains standing one upon another, and it means stopping and stillness. Like keeping still at the back, you put an end to desire and stray thoughts; like walking in a courtyard and seeing no one, the mind becomes quiet. The way is to stop when it is time to stop and go when it is time to go, and to keep your thoughts from leaving their place.",
  "situation": "This is a time to stop things that have overheated or are driven by desire, and to calm your mind. If you pause something you have been rushing, your direction often becomes clearer.",
  "example": "If someone worn out from overwork and still pushing hard receives this hexagram, it means: rather than holding on by willpower, stop for a while, recover, and recheck your direction.",
  "actions": [
   "This week, set aside rest time on purpose and add nothing to it.",
   "Choose one habit or plan to give up now.",
   "Decide in advance what your standard will be for starting again after you stop."
  ],
  "practical": [
   "If you are forcing something to continue, pause and review it.",
   "Reduce the noise in your mind with meditation or rest.",
   "Let go of worries and involvement that are beyond your role and authority."
  ],
  "list": {
   "kw": "Stopping, keeping boundaries",
   "meaning": "The image of mountains stacked together. It means stopping where you should stop and guarding your own boundaries and center.",
   "advice": "You do not need to react to everything. Pause your actions and thoughts, and separate what you should do now from what you should not.",
   "example": "When emotions run high, put off replying. Once you have calmed down, say only what is needed."
  }
 },
 "001011": {
  "name": "Development (Jian)",
  "keyword": "Gradual progress",
  "summary": "Move forward patiently, one step at a time.",
  "core": "Jian (漸) shows a tree growing slowly on a mountain, a way of moving forward step by step, like a wild goose flying from the shore to a rock, then a tree, then a hill. As in a marriage, proceeding in proper order with due courtesy brings good fortune, and it is beneficial to stay with wise virtue and improve the customs around you.",
  "situation": "This is a time when a relationship or a project moves forward slowly, and rushing causes trouble. If you go calmly and do not skip steps, a stable result follows.",
  "example": "If someone thinking about marriage or living together receives this hexagram, it means: rather than rushing because of feelings or outside pressure, it is better to go step by step, with mutual agreement and proper process.",
  "actions": [
   "Break the path to your goal into stages and set a standard for each one.",
   "When you want to rush, go back and recheck the basics one step below.",
   "Even if progress is slow, finish one thing every week."
  ],
  "practical": [
   "Build trust by keeping to order and procedure.",
   "Be content with small progress and stay steady.",
   "In relationships, match the pace and respect the other person's stage."
  ],
  "list": {
   "kw": "Gradual development",
   "meaning": "The image of a tree growing slowly on a mountain. It means a relationship or a project develops in order, without rushing.",
   "advice": "Do not skip the process of building a foundation and trust. Keeping small promises creates long-term results.",
   "example": "For a new relationship or business, set goals for each stage and move to the next only once the current one is stable."
  }
 },
 "001101": {
  "name": "The Wanderer (Lu)",
  "keyword": "A stranger in a strange land",
  "summary": "Keep a low profile and act carefully when you are away from home.",
  "core": "Lu (旅) shows a fire on a mountain that does not stay in one place but moves on, like a traveler wandering far from home. Since you have little to rely on, behave correctly even in small matters, and keep the law with clarity and care so that disputes do not drag on. If you become arrogant, you lose your place, like a bird whose nest is burned.",
  "situation": "This is a time when your footing is weak, for example in an unfamiliar environment, a new organization, a move, or a job change. A humble and careful attitude is the key to safety and adjustment.",
  "example": "If someone settling into a new organization after changing jobs receives this hexagram, it means: rather than showing off your ability, learn the rules and the people first, and build trust from a humble position.",
  "actions": [
   "Find one or two people in the new environment who can help you, and build a relationship with them.",
   "For the first few months, focus on basic adjustment rather than ambitious attempts.",
   "Confirm money and contract matters in writing, and settle disputes quickly."
  ],
  "practical": [
   "Learn and respect the rules and culture of an unfamiliar place first.",
   "Build trust before you show off or make big promises.",
   "Be careful with your words and actions so that you are not pulled into needless disputes."
  ],
  "list": {
   "kw": "Travel, a temporary place",
   "meaning": "A fire on a mountain cannot stay long in one place. It means acting carefully in an unfamiliar setting or a temporary situation.",
   "advice": "When your position and authority are not yet secure, act with humility and courtesy. Do not take property and promises lightly.",
   "example": "On a business trip or in the early days after a move, learn the local rules, avoid needless conflict, and build trust."
  }
 },
 "011011": {
  "name": "The Gentle (Xun)",
  "keyword": "Penetrating gently",
  "summary": "Persuade gently and repeatedly, without losing your core.",
  "core": "Xun (巽) shows wind blowing again and again and seeping in everywhere, and it means humble compliance and gentle penetration. You carry out a task by announcing orders repeatedly and carefully; there is small success, and it helps to meet a great person. But too much compliance and hesitation cloud your decisions, so you must set your center.",
  "situation": "This is a time when persuasion, coordination, and communication matter. Influencing others gently and steadily works better than pushing hard.",
  "example": "If someone trying to persuade team members to adopt a new way of working receives this hexagram, it means: rather than forcing it, widen understanding gradually with gentle, repeated explanations, but keep your key policy clear.",
  "actions": [
   "Break an important persuasion task into stages and keep communicating steadily.",
   "Find a wise senior person to ask for advice and confirm your direction.",
   "When hesitation drags on, set a deadline and decide."
  ],
  "practical": [
   "Repeat your request calmly and check that the other person understands.",
   "Even with a gentle attitude, keep your core principles clear.",
   "Do not just put off decisions; choose when the time comes."
  ],
  "list": {
   "kw": "Seeping in, flexible influence",
   "meaning": "The image of wind blowing again and again. It means having influence through gentle, repeated persuasion and adaptation rather than pressure.",
   "advice": "Rather than pushing everything at once, explain steadily and watch the other person's reaction. Be flexible, but do not let your core standards waver.",
   "example": "To make a new way of working stick, share the reasons again and again and keep up small practices."
  }
 },
 "010011": {
  "name": "Dispersion (Huan)",
  "keyword": "Dissolving",
  "summary": "Release the tension and gather scattered hearts again.",
  "core": "Huan (渙) shows wind passing over water and melting ice, so that what was blocked loosens and scatters. Hearts may scatter and a group may fall apart, but if you set a reverent center, as when making offerings at an ancestral temple, and gather people's hearts, you can cross even great waters. Dissolving small private cliques to form a larger gathering brings supreme good fortune.",
  "situation": "This is a time when relationships or organizations that had hardened are loosening or scattering. Take the benefit of the release, but you also need to set a rallying point and gather people again.",
  "example": "If a team's mood has scattered and morale has dropped, and someone receives this hexagram, it means: rather than blaming people, let go of each other's grievances, re-establish shared goals and values, and bring hearts together.",
  "actions": [
   "Reach out first to a relationship that has grown distant, and create a chance to clear up misunderstandings.",
   "Hold a gathering to share the organization's purpose and values again.",
   "Sort out which worries to release and which center to hold on to."
  ],
  "practical": [
   "Release built-up resentment and misunderstanding, and start a conversation.",
   "Put aside small self-interests and bring people together around a larger goal.",
   "Remind scattered people of the values they share."
  ],
  "list": {
   "kw": "Scattering, clearing blockages",
   "meaning": "The image of wind passing over water and scattering it. It means loosening blockages in hearts or in a group so that things flow again.",
   "advice": "You need a center to gather the scattered energy again. Let go of old resentments and restore shared goals and trust.",
   "example": "If your team has split, check your common goal rather than blaming, and set up a safe place where people can talk."
  }
 },
 "001100": {
  "name": "Preponderance of the Small (Xiao Guo)",
  "keyword": "Small things, not big ones",
  "summary": "Be careful in small matters; do not force big goals now.",
  "core": "Xiao Guo (小過) shows thunder on a mountain, loud but unable to rise high. Small matters are possible but big ones are hard, and it is right to come down rather than go up. In conduct, be a little too respectful; in mourning, a little too sorrowful; in spending, a little too frugal.",
  "situation": "This is a time to look after daily life and the basics with humility and care, rather than taking on big challenges or showing off. Being careful and staying low in small matters is beneficial.",
  "example": "If someone who wants to lead a big project receives this hexagram, it means: rather than taking on a challenge beyond your means, do the small tasks you have now exactly right and build trust.",
  "actions": [
   "Put off big challenges and solve what you can handle now, one thing at a time.",
   "Be a little more careful than usual with your spending and your words.",
   "Spend your time building a base below you rather than seeking approval from above."
  ],
  "practical": [
   "Rather than starting big things, finish small things accurately.",
   "Be a little more respectful and frugal.",
   "Act with realistic, modest expectations rather than high goals."
  ],
  "list": {
   "kw": "Care in small things",
   "meaning": "The image of thunder rumbling on a mountain. It is a time to be careful and attentive in small matters rather than forcing big ones.",
   "advice": "Rather than trying to soar high, achieve low and concrete goals. Do not neglect procedures and safety that seem minor.",
   "example": "Before a big decision, run a small test and check things first to reduce mistakes."
  }
 },
 "010101": {
  "name": "Before Completion (Wei Ji)",
  "keyword": "Not yet finished",
  "summary": "Not yet across; the end is also a beginning, so finish carefully.",
  "core": "Wei Ji (未濟) shows fire and water out of their proper places and at odds, yet this is also a chance for change. Like a young fox that wets its tail when almost across the river, carelessness in the last stage brings failure, so you must discern things carefully and put each in its proper place. The sixty-four hexagrams end with Before Completion because an ending is itself a new beginning.",
  "situation": "This is a time when the goal is close but not yet complete. You need to focus on the final finish and tidying up, and prepare for the next cycle.",
  "example": "If someone nearing a project deadline receives this hexagram, it means: do not let your guard down because it is almost done. Do a thorough final review and cleanup, and prepare for the next stage.",
  "actions": [
   "List the remaining work and set completion criteria and a deadline for each item.",
   "Create a final checking procedure so you do not make mistakes by rushing at the end.",
   "Think ahead about the next task that will follow once this one is done."
  ],
  "practical": [
   "Do not relax at the finishing stage; check the details to the end.",
   "Spend time putting each element in its proper place and organizing it.",
   "Do not see unfinished work as failure; use it as the starting point for the next stage."
  ],
  "list": {
   "kw": "Unfinished, still possible",
   "meaning": "The image of fire and water that do not match. The work is not yet complete, but it means possibility remains if you find the right order.",
   "advice": "Do not write off unfinished work as failure. Check what is missing, adjust the order and method, and finish one step at a time.",
   "example": "If the plan has not gone as hoped, make the remaining tasks concrete and start with the most important next action."
  }
 }
};
