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
          title: 'Welcome to Shimmer',
          subtitle: 'Let’s tackle your ADHD, together.',
        },
      ]}
      />
    );

    expect(component).toBeDefined();
  });
});
