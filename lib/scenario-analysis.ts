export type ScenarioStance = "FAVORABLE" | "UNFAVORABLE"

export type ScenarioTopic = {
  title: string
  stance: ScenarioStance
  body: string
  sourceLabel: string
  sourceUrl: string
}

export type ScenarioStrategy = {
  title: string
  body: string
  sourceLabel: string
  sourceUrl: string
}

export type ScenarioSummaryPoint = {
  stance: ScenarioStance
  body: string
}

export type ScenarioParagraph = {
  title?: string
  body?: string
  summaryPoints?: ScenarioSummaryPoint[]
  sourceLabel?: string
  sourceUrl?: string
}

export type ScenarioSide = {
  topics?: ScenarioTopic[]
  paragraphs?: ScenarioParagraph[]
  strategies?: {
    heading: string
    items: ScenarioStrategy[]
  }
}

export type CompanyKey =
  | "agency-hires"
  | "free-the-founder"
  | "shadow-light-studios"
  | "summary-strategic"

export type CompanyScenario = {
  label: string
  lula: ScenarioSide
  bolsonaro: ScenarioSide
}

export const COMPANY_SCENARIOS: Record<CompanyKey, CompanyScenario> = {
  "agency-hires": {
    label: "Agency Hires",
    lula: {
      topics: [
        {
          title: "Tax Reform",
          stance: "FAVORABLE",
          body: "Tax unification under the dual VAT model reduces long term bureaucratic invoicing costs.",
          sourceLabel: "EDICOM Tax Reform",
          sourceUrl: "https://edicomgroup.com",
        },
        {
          title: "Labor Legislation",
          stance: "UNFAVORABLE",
          body: "Strict regulation projects for the platform economy raise the risk of employment relationships for local service providers.",
          sourceLabel: "Reuters Americas",
          sourceUrl: "https://www.reuters.com",
        },
        {
          title: "Data Protection",
          stance: "UNFAVORABLE",
          body: "The transformation of ANPD into an autonomous agency expands inspections increasing candidate data governance costs.",
          sourceLabel: "Baker McKenzie Insights",
          sourceUrl: "https://www.bakermckenzie.com",
        },
        {
          title: "Central Bank Autonomy",
          stance: "UNFAVORABLE",
          body: "Political tensions surrounding the monetary authority bring exchange rate volatility for international remittances.",
          sourceLabel: "Reuters Economy",
          sourceUrl: "https://www.reuters.com",
        },
        {
          title: "Debureaucratization",
          stance: "FAVORABLE",
          body: "The expansion of integrated digital public services facilitates registration verification for new talents.",
          sourceLabel: "Reuters World News",
          sourceUrl: "https://www.reuters.com",
        },
      ],
    },
    bolsonaro: {
      topics: [
        {
          title: "Tax Reform",
          stance: "UNFAVORABLE",
          body: "Maintaining tax fragmentation preserves high accounting costs to operate interstate B2B recruitment.",
          sourceLabel: "Reuters Economics",
          sourceUrl: "https://www.reuters.com",
        },
        {
          title: "Labor Legislation",
          stance: "FAVORABLE",
          body: "The practical application of the Economic Freedom Law ensures the validity of contracts with service providers as legal entities.",
          sourceLabel: "Reuters Business",
          sourceUrl: "https://www.reuters.com",
        },
        {
          title: "Central Bank Autonomy",
          stance: "FAVORABLE",
          body: "The defense of the legal independence of the monetary authority isolates the exchange rate from government pressures bringing predictability.",
          sourceLabel: "Reuters Economics",
          sourceUrl: "https://www.reuters.com",
        },
        {
          title: "Debureaucratization",
          stance: "FAVORABLE",
          body: "Exemption from licenses for low risk corporate activities speeds up the rapid opening of local bases.",
          sourceLabel: "Reuters Business",
          sourceUrl: "https://www.reuters.com",
        },
      ],
    },
  },
  "free-the-founder": {
    label: "Free The Founder",
    lula: {
      topics: [
        {
          title: "Tax Reform",
          stance: "FAVORABLE",
          body: "Tax centralization into fixed rates decreases permanent accounting expenses for selling corporate software.",
          sourceLabel: "EDICOM Tax Reform",
          sourceUrl: "https://edicomgroup.com",
        },
        {
          title: "Artificial Intelligence Regulation",
          stance: "UNFAVORABLE",
          body: "The advancement of Bill 2338 adopts a punitive risk based governance model that stalls automation testing.",
          sourceLabel: "Demarest Law Review",
          sourceUrl: "https://www.demarest.com.br",
        },
        {
          title: "Data Protection",
          stance: "UNFAVORABLE",
          body: "Strict traceability requirements demand costly revisions in digital workflow architectures.",
          sourceLabel: "DLA Piper Privacy",
          sourceUrl: "https://www.dlapiperdataprotection.com",
        },
        {
          title: "Debureaucratization",
          stance: "FAVORABLE",
          body: "Unified public systems facilitate the automation of routines via direct API corporate connections.",
          sourceLabel: "Reuters Business",
          sourceUrl: "https://www.reuters.com",
        },
      ],
    },
    bolsonaro: {
      topics: [
        {
          title: "Tax Reform",
          stance: "UNFAVORABLE",
          body: "The lack of simplification imposes dense tax planning to avoid double taxation on digital software solutions.",
          sourceLabel: "Reuters Economics",
          sourceUrl: "https://www.reuters.com",
        },
        {
          title: "Artificial Intelligence Regulation",
          stance: "FAVORABLE",
          body: "Guidelines focused on self regulation give full freedom to create and scale automation agents without legal barriers.",
          sourceLabel: "Demarest Law Review",
          sourceUrl: "https://www.demarest.com.br",
        },
        {
          title: "Data Protection",
          stance: "FAVORABLE",
          body: "A primarily educational institutional approach reduces risks of heavy penalties in corporate systems integrations.",
          sourceLabel: "DLA Piper Privacy",
          sourceUrl: "https://www.dlapiperdataprotection.com",
        },
      ],
    },
  },
  "shadow-light-studios": {
    label: "Shadow Light Studios",
    lula: {
      topics: [
        {
          title: "Tax Reform",
          stance: "FAVORABLE",
          body: "Rate standardization ends municipal disputes facilitating nationwide media contracts.",
          sourceLabel: "EDICOM Tax Reform",
          sourceUrl: "https://edicomgroup.com",
        },
        {
          title: "Data Protection and Digital Statute",
          stance: "UNFAVORABLE",
          body: "The regulation of minor protection in virtual environments through Decree 12880 requires severe compliance and impact reports in online campaigns.",
          sourceLabel: "Presidência da República do Brasil",
          sourceUrl: "https://legislacao.presidencia.gov.br",
        },
        {
          title: "Digital Content Regulation",
          stance: "UNFAVORABLE",
          body: "The focus on holding digital platforms accountable raises the risk of suspension or forced moderation of viral marketing pieces.",
          sourceLabel: "Deutsche Welle",
          sourceUrl: "https://www.dw.com",
        },
      ],
    },
    bolsonaro: {
      topics: [
        {
          title: "Tax Reform",
          stance: "UNFAVORABLE",
          body: "High accounting bureaucracy maintained in invoicing campaigns with global brands spread across different capitals.",
          sourceLabel: "Reuters Economics",
          sourceUrl: "https://www.reuters.com",
        },
        {
          title: "International Trade Agreements",
          stance: "UNFAVORABLE",
          body: "Diplomatic clashes in environmental areas can generate boycotts and affect foreign brands partnering with the studio.",
          sourceLabel: "BBC News",
          sourceUrl: "https://www.bbc.com",
        },
        {
          title: "Digital Content Regulation",
          stance: "FAVORABLE",
          body: "Rejection of state control over social media ensures broad freedom for broadcasting viral content without prior censorship.",
          sourceLabel: "Deutsche Welle",
          sourceUrl: "https://www.dw.com",
        },
      ],
    },
  },
  "summary-strategic": {
    label: "Summary/Strategic",
    lula: {
      paragraphs: [
        {
          title: "Summary",
          summaryPoints: [
            {
              stance: "FAVORABLE",
              body: "long term tax simplification through the newly approved dual VAT model and enhanced digital integration of public systems.",
            },
            {
              stance: "UNFAVORABLE",
              body: "immediate labor contract flexibility due to stricter platform worker regulations along with heavy compliance overhead from risk based artificial intelligence legislation.",
            },
          ],
        },
      ],
      strategies: {
        heading: "Disruptive Strategies to Mitigate Unfavorable Aspects",
        items: [
          {
            title: "Bypassing Rigid AI Regulations via Regulatory Sandboxes",
            body: "To scale the automation systems of Free The Founder without facing immediate compliance penalties under Bill 2338, the company must actively enter the official Regulatory Sandbox on Artificial Intelligence and Data Protection launched by the National Data Protection Authority. This collaborative experimental framework allows foreign technology firms to test and deploy machine learning models in a legally insulated environment, neutralizing the risk of administrative sanctions while gaining institutional validation.",
            sourceLabel: "OECD AI Observatory and ANPD Public Call Gazette",
            sourceUrl: "https://oecd.ai",
          },
          {
            title: "Neutralizing Labor Friction through Tech Cluster Arbitrage",
            body: "To protect AgencyHires from local employment relationship claims arising from strict labor oversight, the business should transition from independent contractor models to a structured B2B node. By anchoring the operational infrastructure within Porto Digital, Brazil's leading technology hub, the company can leverage pre existing legal frameworks designed for corporate outsourcing while utilizing global Employer of Record networks to fully insulate the international parent entity from domestic liabilities.",
            sourceLabel: "Deel Brazil Labor Compliance Guides",
            sourceUrl: "https://www.deel.com",
          },
        ],
      },
    },
    bolsonaro: {
      paragraphs: [
        {
          title: "Summary",
          summaryPoints: [
            {
              stance: "FAVORABLE",
              body: "rapid operational scaling through the Economic Freedom Law and total freedom to innovate with automated systems under a self regulatory artificial intelligence framework.",
            },
            {
              stance: "UNFAVORABLE",
              body: "administrative cost efficiency due to the preservation of a deeply fragmented legacy tax structure alongside potential geopolitical frictions affecting international brand relations.",
            },
          ],
        },
      ],
      strategies: {
        heading: "Disruptive Strategies to Mitigate Unfavorable Aspects",
        items: [
          {
            title: "Conquering Tax Fragmentation through Geographical Arbitrage",
            body: "To eliminate the heavy accounting bureaucracy of the legacy indirect tax system for Free The Founder and AgencyHires, the corporate entity should be registered in Barueri. This specific municipality operates as a premier corporate tax haven by keeping the municipal service tax at the absolute legal minimum of two percent for technology companies. Integrating this corporate setup with unified automated tax routing engines allows the business to bypass regional compliance layers completely.",
            sourceLabel: "PwC Worldwide Tax Summaries and Europartner Municipal Guides",
            sourceUrl: "https://taxsummaries.pwc.com",
          },
          {
            title: "Insulating Global Media Contracts from Geopolitical Backlash",
            body: "To protect the international enterprise clients of Shadow Light Studios from any external geopolitical or environmental friction, the business must implement a dual corporate split model. All primary creative agreements and intellectual property rights must remain anchored within an offshore jurisdiction such as Delaware or Singapore. The Brazilian subsidiary will function exclusively as an internal, insulated cost center for media execution, completely shielding global brands from local market volatility.",
            sourceLabel: "CMS Global Market Entry Systems",
            sourceUrl: "https://cms.law",
          },
        ],
      },
    },
  },
}

export const COMPANY_KEYS = Object.keys(COMPANY_SCENARIOS) as CompanyKey[]
