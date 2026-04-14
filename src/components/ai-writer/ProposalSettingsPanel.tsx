import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Eye_closed from './icons/Eye_closed.tsx'
import Eye_closed1 from './icons/Eye_closed1.tsx'
import Eye_closed2 from './icons/Eye_closed2.tsx'
import Pencil_edit from './icons/Pencil_edit.tsx'
import List_add_item from './icons/List_add_item.tsx'
import Document_text_lines from './icons/Document_text_lines.tsx'
import IconButton from './IconButton.tsx'
import InfoIconButton from './InfoIconButton.tsx'
import InlineIconButton from './InlineIconButton.tsx'
import TextareaField from './TextareaField.tsx'
import ToggleSwitch from './ToggleSwitch.tsx'
import DocumentationLink from './DocumentationLink.tsx'
import FormLabel from './FormLabel.tsx'
import AbTestingCheckbox from './AbTestingCheckbox.tsx'
import InlineIconButtonRow from './InlineIconButtonRow.tsx'
import TinyMCEEditor from './TinyMCEEditor.tsx'


// Component
function ProposalSettingsPanel() {
    const [aiInstructionsOn, setAiInstructionsOn] = React.useState(true);
    const [additionalContextOn, setAdditionalContextOn] = React.useState(true);
    const [templateStructureOn, setTemplateStructureOn] = React.useState(true);

    return <div className={"space-y-4"}>
    	<div className={"rounded-xl border border-dashed border-blue-200 bg-blue-50/70 p-4 dark:border-blue-400/60 dark:bg-blue-500/10"}>
    		<div className={"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"}>
    			<div className={"flex items-start gap-3"}>
    				<span className={"flex size-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-200"}>
    					<Eye_closed1 />
    				</span>
    				<div>
    					<h3 className={"text-sm font-semibold text-blue-900 dark:text-blue-100"}>
    						Test your prompt on live jobs
    					</h3>
    					<p className={"text-sm text-blue-800 dark:text-blue-200"}>
    						Open the job preview panel to generate a proposal with your current prompt and iterate faster.
    					</p>
    				</div>
    			</div>
    			
                <IconButton
                    className={"justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background shadow-xs hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex items-center gap-2 border-blue-200 whitespace-nowrap text-blue-700 hover:bg-blue-100 dark:border-blue-400/60 dark:text-blue-100 dark:hover:bg-blue-500/20"}
                    icon={<Eye_closed2 />}
                    label="Preview jobs"
                />
            
    		</div>
    	</div>
    	<div className={"space-y-2.5 rounded-xl border bg-white p-6"}>
    		<div className={"flex items-start gap-20"}>
    			<div className={"flex items-start gap-4"}>
    				<div className={"flex size-14 shrink-0 items-center justify-center rounded-xl bg-violet-100"}>
    					<Pencil_edit />
    				</div>
    				<div>
    					<h3 className={"mb-0.5 text-base font-semibold text-gray-900"}>
    						AI Instructions
    					</h3>
    					<p className={"text-sm text-gray-600"}>
    						Instruct the AI on exactly how to write your proposals. Input your "System Prompt" here to define rules for handling client requirements, avoiding AI detection, formatting portfolio links, and creating natural opening hooks.
    					</p>
    				</div>
    			</div>
    			<div className={"mt-1.5 ml-auto"}>
    				<ToggleSwitch id="ai-instructions-toggle" isOn={aiInstructionsOn} onToggle={() => setAiInstructionsOn(!aiInstructionsOn)} />
    			</div>
    		</div>
    		{aiInstructionsOn && <div className={"space-y-4 pl-18"}>
    			<div>
    				<div className={"mb-1.5 flex items-center justify-between gap-2"}>
    					<div className={"flex items-center gap-1.5"}>
    						<label className={"peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-800"} htmlFor={"system-instructions"}>
    							Prompt
    							<span className={"ml-1 text-red-600"}>
    								*
    							</span>
    						</label>
    						
            <InfoIconButton />
        
    					</div>
    					
            <InlineIconButtonRow
                label1="Show examples"
                icon1="idea"
                label2="Generate instructions"
                icon2="sparkles"
            />
        
    				</div>
    				
                <TextareaField
                    id="system-instructions"
                    placeholder="Your are an Upwork proposal writer..."
                    height="257.6px"
                    content={`You are an expert Upwork proposal writer. Write proposals that are professional, confident, and results-oriented.
        
    Rules:
    - Start with a strong opening that directly addresses the client's main pain point or goal. Never use generic greetings like "Dear Hiring Manager" or "I hope this finds you well."
    - Demonstrate understanding of their project by referencing specific details from the job posting.
    - Highlight 1-2 relevant past results with measurable outcomes (e.g., "increased conversion by 35%").
    - Keep the tone confident but not arrogant — position yourself as a collaborative partner, not just a service provider.
    - End with a clear call-to-action inviting them to discuss next steps.
    - Keep proposals concise — no more than 150-200 words.
    - Never use filler phrases like "I believe I am the perfect fit" or "I am very passionate about."
    - Avoid bullet-point lists of skills — instead, weave experience naturally into the narrative.`}
                />

    			</div>
    		</div>}
    	</div>
    	<div className={"space-y-2.5 rounded-xl border bg-white p-6"}>
    		<div className={"flex items-start gap-20"}>
    			<div className={"flex items-start gap-4"}>
    				<div className={"flex size-14 shrink-0 items-center justify-center rounded-xl bg-sky-100 bg-gradient-to-br"}>
    					<List_add_item />
    				</div>
    				<div>
    					<h3 className={"mb-0.5 text-base font-semibold text-gray-900"}>
    						Additional Context
    					</h3>
    					<p className={"text-sm text-gray-600"}>
    						Tell us about yourself in your own words. Include your background, achievements, portfolio links, GitHub, LinkedIn, or any other information that will help AI create more personalized proposals.
    					</p>
    				</div>
    			</div>
    			<div className={"mt-1.5 ml-auto"}>
    				
                <ToggleSwitch id="additional-context-toggle" isOn={additionalContextOn} onToggle={() => setAdditionalContextOn(!additionalContextOn)} />
            
    			</div>
    		</div>
    		{additionalContextOn && <div className={"pl-18"}>

                <TextareaField
                    id="additional-context"
                    placeholder={`I'm a full-stack developer with 5+ years of experience in React and Node.js. My GitHub: https://github.com/username. I've built e-commerce platforms for startups and have a portfolio at https://myportfolio.com. I specialize in creating scalable web applications and have worked with clients in fintech and healthcare industries...`}
                    height="417.6px"
                    content={`Projects links:
    
    My previous "ELECTRICAL ESTIMATORS" projects:
    
    1. 4126 Centerplace – Greeley, Colorado
    Plans & Excel: https://drive.google.com/drive/folders/1d17n7I-H-lEbh-4ppbywUCuFFOtyYzAw?usp=sharing
    
    2. Aurora Public School – Aurora, Colorado
    Plans & Excel: https://drive.google.com/drive/folders/1XNzgjVoaksCeS-ZJFbloxuSno0yq0cF6?usp=sharing
    
    3. Bob Penkhus Mazda – Auto Park Dealership Project
    Plans & Excel: https://drive.google.com/drive/folders/10MIpGEITkvTVlGYrBD3-aovH1KkXApQ4?usp=sharing
    
    4. Olive Garden – Westminster Location
    Plans & Excel: https://drive.google.com/drive/folders/1Gr178sezxsPjBvoTCq88vgg6RJmSlx_h?usp=sharing
    Previous General Contractor (GC) Projects
    ----------------------------------------------------------------------------------------------------------------------
    GC Estimation Project
    
    1. 2081 Michigan – GC Estimation Project
    Excel: https://docs.google.com/spreadsheets/d/1x6H0kYk3Ym9PQN6pg6iPeTR2EOljjEt_/edit?usp=sharing
    Plans: https://drive.google.com/file/d/1XEP793acNiSveZE4BZLv5Hfe-rDA2PU5/view?usp=sharing
    
    Folder: https://drive.google.com/drive/folders/1Mso0Mrt3dz4Fdm760x9f6p95g5lN-M3I?usp=sharing
    
    2. Highland Townhomes – Tampa Heights
    Folder: https://drive.google.com/drive/folders/1qt1smweSZUBR36Z0n1RpVAzLYBt6L-AW?usp=sharing
    
    3. Rankin Pool House – Residential Project
    Folder: https://drive.google.com/drive/folders/1KUs7JJSTvgtbUbBQhTUoSQdVzchCDouj?usp=sharing
    
    ----------------------------------------------------------------------------------------------------------------------
    
    Plumbing Projects
    
    1. DoubleTree Hotel – Universal Studios (Fast Track Project)
    
    Excel: 
    Plans: 
    folder:
    
    2. Winter Garden – Florida Plumbing Project
    Excel: 
    Plans: 
    folder: 
     
    ----------------------------------------------------------------------------------------------------------------------
    
    MEP Projects
    
    1. HMK – JFK University Medical Center Boiler Plant Upgrade
    Excel:
    https://docs.google.com/spreadsheets/d/1uELP7mObZCmv6YWWVgpKKu_PYZAaYqvz/view?usp=sharing
    
    Plans:
    https://drive.google.com/file/d/14005eD105u-ca_x9blCNeODzP-MtUnR1/view?usp=sharing
    
    Folder:
    https://drive.google.com/drive/folders/1S2xavm1H0J--biylkhPVdMOMgCkU3xqm?usp=sharing
    
    ----------------------------------------------------------------------------------------------------------------------
    
    Concrete & Masonry Projects
    
    1. Pelham High School – Concrete & Masonry Estimation
    Folder:
    https://drive.google.com/drive/folders/1Lp8x_F_ki-dmLYNqK9otX8w7c5c_sU5m?usp=sharing
    
    2. Process Machinery Expansion – Industrial Project
    Folder:
    https://drive.google.com/drive/folders/1BF2bw4mIQ04wYIQj0VJ-at1BpXCAdc8q?usp=sharing
    
    ---------------------------------------------------------------------------------------------------------------------- 
    
    Sitework Projects
    
    1. Mercer County Park Commission – Sitework Estimation
    Excel: 
    Plans: 
    folder: 
    
    ----------------------------------------------------------------------------------------------------------------------
    
    Recent Trades Estimated
    
    Barriers & Fencing
    Concrete
    Countertops
    Demolition
    Earthwork
    Roofing Estimates
    Exterior Building Facade
    Fire Protection
    General Contracting (GC)
    Glass & Glazing
    Landscaping
    Lumber / Framing
    Masonry
    Millwork
    Metal Works (MTA Metals)
    Painting`}
                />

    		</div>}
    	</div>
    	<div className={"space-y-2.5 rounded-xl border bg-white p-6"}>
    		<div className={"flex items-start gap-20"}>
    			<div className={"flex items-start gap-4"}>
    				<div className={"flex size-14 shrink-0 items-center justify-center rounded-xl bg-amber-100"}>
    					<Document_text_lines />
    				</div>
    				<div>
    					<h3 className={"mb-0.5 text-base font-semibold text-gray-900"}>
    						Template Structure
    						<span className={"text-sm font-normal text-gray-500"}>
    							(Optional)
    						</span>
    					</h3>
    					<p className={"text-sm text-gray-600"}>
    						Define specific template structure, prompts, or content that AI should follow when writing cover letters. Combine your static text with dynamic AI-generated parts for a natural, personalized result. This gives you more control over the exact format and content.
    					</p>
    					
            <DocumentationLink />
        
    				</div>
    			</div>
    			<div className={"mt-1.5 ml-auto"}>
    				
                <ToggleSwitch id="template-structure-toggle" isOn={templateStructureOn} onToggle={() => setTemplateStructureOn(!templateStructureOn)} />
            
    			</div>
    		</div>
    		{templateStructureOn && <div className={"space-y-6 pl-18"}>
    			<div className={"flex w-full flex-wrap gap-10"}>
    				<div className={"flex-1"}>

                <FormLabel
                    text="Template"
                    htmlFor="template"
                    className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                />
            
    					
            <TinyMCEEditor visibility="hidden" height="300px" />
        
    				</div>
    			</div>
    			<div className={"mb-4"}>
    				<div className={"flex items-center space-x-2"}>
    					<AbTestingCheckbox />
    					
                <FormLabel
                    text="Enable A/B testing"
                    htmlFor="abTesting"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                />
            
    				</div>
    				<p className={"mt-1 pl-6 text-sm text-gray-500"}>
    					A/B testing allows you to compare two versions of a cover letter to see which one performs better. It will randomly select one of the versions when filling the cover letter on the proposal submission page.
    				</p>
    			</div>
    		</div>}
    	</div>
    </div>}


export default ProposalSettingsPanel
