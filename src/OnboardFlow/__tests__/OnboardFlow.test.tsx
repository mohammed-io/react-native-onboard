import React from 'react';
import { OnboardFlow } from '../index';

describe('Onboarding test suite', () => {
  it('component exist', () => {
    const component = (
        <OnboardFlow>
          <OnboardFlow.Page title="Page 1" subtitle="Page 1 subtitle" />
          <OnboardFlow.Page title="Page 2" subtitle="Page 2 subtitle" />
      </OnboardFlow>
    );

    expect(component).toBeDefined();
  });
});
