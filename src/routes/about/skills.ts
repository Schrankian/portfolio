import { Frequency } from "~/components/SkillProficiency";

export const skillDate = new Date('2025-10-02');
export const skills = {
	"Languages": {
		"JavaScript": { score: 90, frequency: Frequency.DAILY },
		"TypeScript": { score: 90, frequency: Frequency.DAILY },
		"HTML5": { score: 80, frequency: Frequency.WEEKLY },
		"CSS3": { score: 80, frequency: Frequency.WEEKLY },
		"Rust": { score: 80, frequency: Frequency.WEEKLY },
		"Dart": { score: 70, frequency: Frequency.MONTHLY },
		"C": { score: 70, frequency: Frequency.MONTHLY },
		"C#": { score: 30, frequency: Frequency.RARELY },
		"Python": { score: 80, frequency: Frequency.WEEKLY },
	},
	"Frameworks": {
		"Vue.js": { score: 20, frequency: Frequency.RARELY },
		"Angular": { score: 80, frequency: Frequency.DAILY },
		"Next.js": { score: 90, frequency: Frequency.MONTHLY },
		"React": { score: 90, frequency: Frequency.MONTHLY },
		"Electron": { score: 90, frequency: Frequency.DAILY },
		"Tauri": { score: 80, frequency: Frequency.MONTHLY },
		"Flutter": { score: 80, frequency: Frequency.MONTHLY }
	},
	"Tools": {
		"Kerberos": { score: 90, frequency: Frequency.WEEKLY },
		"Git": { score: 95, frequency: Frequency.DAILY },
		"Docker": { score: 90, frequency: Frequency.DAILY },
		"Nginx": { score: 80, frequency: Frequency.WEEKLY }
	}
} as const
