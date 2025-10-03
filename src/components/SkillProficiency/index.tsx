import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import styles from './skillProficiency.module.css';

export const Frequency = {
  DAILY: {
	label: 'Daily',
	multiplier: 0.1
  },
  WEEKLY: {
	label: 'Weekly',
	multiplier: 0.05
  },
  MONTHLY: {
	label: 'Monthly',
	multiplier: -0.1
  },
  RARELY: {
	label: 'Rarely',
	multiplier: -0.2
  },
  NEVER_AGAIN: {
	label: 'Never Again',
	multiplier: -1
  }
} as const;

export interface SkillProficiencyProps {
  name: string;
  current_score: number;
  current_timestamp: Date;
  frequency: typeof Frequency[keyof typeof Frequency];
}

export const SkillProficiency = component$<SkillProficiencyProps>((props) => {
  const score = useSignal(props.current_score);

  useTask$(() => {
	const now = new Date();
	const days_passed = Math.floor((now.getTime() - props.current_timestamp.getTime()) / (1000 * 60 * 60 * 24));

	score.value += Math.floor(days_passed * props.frequency.multiplier);
	
	score.value = Math.max(0, Math.min(100, score.value)); // Ensure score is between 0 and 100
  });

  return (
	<div
	  class={[
		styles.container,
		score.value === 100
		  ? styles.godlike
		  : score.value >= 80
		  ? styles.good
		  : score.value >= 60
		  ? styles.ok
		  : score.value === 0
		  ? styles.retired
		  : styles.bad
	  ]}
	>
	  {props.name}
	</div>
  );
});
