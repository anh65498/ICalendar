import React from 'react';
import Section from 'components/Marketing/Section';
import AboutItem from 'components/Marketing/About/AboutItem';

import calendar from 'assets/img/calendar-icon.svg';
import todo from 'assets/img/todo-icon.svg';
import user from 'assets/img/user-icon.svg';

const ITEMS = [
  {
    name: 'Calendar',
    text:
      'Sync your Calendar across all platforms with our easy to use calendars',
    icon: calendar,
  },
  {
    name: 'Organize',
    text: 'Make organized task lists to organize you workload',
    icon: todo,
  },
  {
    name: 'Create',
    text:
      'Create and customize your own avatar with the points you receive for complete',
    icon: user,
  },
];

function About() {
  return (
    <Section
      title="Let's get started"
      subtitle="The semantic toolbox to organize your life"
    >
      <div style={{ display: 'flex' }}>
        {ITEMS.map((itemProps) => (
          <AboutItem {...itemProps} />
        ))}
      </div>
    </Section>
  );
}

export default About;
