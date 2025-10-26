import { Frequency } from "~/components/SkillProficiency";

export const skillDate = new Date('2025-10-26');
export const skills = {
	[$localize`Languages`]: {
		"JavaScript": { score: 90, frequency: Frequency.DAILY },
		"TypeScript": { score: 95, frequency: Frequency.DAILY },
		"Rust": { score: 80, frequency: Frequency.WEEKLY },
		"Dart": { score: 70, frequency: Frequency.MONTHLY },
		"C": { score: 70, frequency: Frequency.MONTHLY },
		"C#": { score: 30, frequency: Frequency.RARELY },
		"Python": { score: 85, frequency: Frequency.WEEKLY },
	},
	[$localize`Frameworks`]: {
		"Angular": { score: 90, frequency: Frequency.DAILY },
		"Next.js": { score: 80, frequency: Frequency.MONTHLY },
		"React": { score: 85, frequency: Frequency.MONTHLY },
		"Electron": { score: 95, frequency: Frequency.DAILY },
		"Tauri": { score: 80, frequency: Frequency.MONTHLY },
		"Flutter": { score: 80, frequency: Frequency.MONTHLY }
	},
	[$localize`Tools`]: {
		"Kerberos": { score: 90, frequency: Frequency.WEEKLY },
		"Git": { score: 95, frequency: Frequency.DAILY },
		"Docker": { score: 90, frequency: Frequency.DAILY },
		"Kubernetes": { score: 70, frequency: Frequency.WEEKLY },
		"Nginx": { score: 80, frequency: Frequency.WEEKLY }
	}
} as const
