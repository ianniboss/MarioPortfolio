const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST || 'https://us.i.posthog.com';
const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;

let initialized = false;

export const hasAnalyticsConfig = Boolean(POSTHOG_KEY);

export const loadAnalytics = () => {
  if (!hasAnalyticsConfig || typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (initialized) {
    return Promise.resolve(window.posthog);
  }

  const posthog = window.posthog || [];
  window.posthog = posthog;

  if (!posthog.__SV) {
    posthog._i = [];
    posthog.init = function init(apiKey, config, name) {
      function bindMethod(target, methodName) {
        const parts = methodName.split('.');
        if (parts.length === 2) {
          target = target[parts[0]];
          methodName = parts[1];
        }
        target[methodName] = function enqueue() {
          target.push([methodName].concat(Array.prototype.slice.call(arguments, 0)));
        };
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.crossOrigin = 'anonymous';
      script.async = true;
      script.src = `${config.api_host.replace('.i.posthog.com', '-assets.i.posthog.com')}/static/array.js`;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);

      const target = name ? (posthog[name] = []) : posthog;
      target.people = target.people || [];
      target.toString = function toString(isPeople) {
        let label = 'posthog';
        if (name) label += `.${name}`;
        if (!isPeople) label += ' (stub)';
        return label;
      };
      target.people.toString = function peopleToString() {
        return `${target.toString(1)}.people (stub)`;
      };

      const methods = 'init capture identify alias people.set people.set_once reset opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing register register_once unregister get_distinct_id get_session_id get_session_replay_url onFeatureFlags reloadFeatureFlags getFeatureFlag getFeatureFlagPayload isFeatureEnabled group setPersonProperties'.split(' ');
      methods.forEach((methodName) => bindMethod(target, methodName));
      posthog._i.push([apiKey, config, name]);
    };
    posthog.__SV = 1;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
  });
  initialized = true;

  return Promise.resolve(posthog);
};
