import React from 'react';
import { OnboardFlow } from '../index';

describe('Onboarding test suite', () => {
  it('component exist', () => {
    const component = (
      <OnboardFlow pages={[
        {
          title: 'Science-backed methods',
          subtitle: 'We use the latest science-backed strategies, proven to work.',
        },
        {
          title: 'Welcome to our app',
          subtitle: 'Let’s work together',
        },
      ]}
      />
    );

    expect(component).toBeDefined();
  });
});
