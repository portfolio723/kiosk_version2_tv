import React from 'react';
import { useWebApp, WebAppProvider } from './WebAppContext';
import { WebHeader } from './components/WebHeader';
import { WebFooter } from './components/WebFooter';
import { W1Home } from './screens/W1Home';
import { W2SignUp } from './screens/W2SignUp';
import { W3Login } from './screens/W3Login';
import { W4Profile } from './screens/W4Profile';
import { W5Catalog } from './screens/W5Catalog';
import { W6TryOn } from './screens/W6TryOn';
import { W7Lookbook } from './screens/W7Lookbook';
import { AppExperienceMode } from '../types';

interface PadavalaWebAppProps {
  experienceMode: AppExperienceMode;
  onSwitchExperience: (mode: AppExperienceMode) => void;
}

const PadavalaWebContent: React.FC<PadavalaWebAppProps> = ({
  experienceMode,
  onSwitchExperience,
}) => {
  const { currentScreen } = useWebApp();

  return (
    <div className="w-full min-h-screen bg-[#07222B] text-white flex flex-col justify-between">
      {/* Global Responsive Navigation Header */}
      <WebHeader
        experienceMode={experienceMode}
        onSwitchExperience={onSwitchExperience}
      />

      {/* Screen Router */}
      <main className="flex-1 w-full">
        {currentScreen === 'W1' && <W1Home />}
        {currentScreen === 'W2' && <W2SignUp />}
        {currentScreen === 'W3' && <W3Login />}
        {currentScreen === 'W4' && <W4Profile />}
        {currentScreen === 'W5' && <W5Catalog />}
        {currentScreen === 'W6' && <W6TryOn />}
        {currentScreen === 'W7' && <W7Lookbook />}
      </main>

      {/* Global Footer */}
      <WebFooter />
    </div>
  );
};

export const PadavalaWebApp: React.FC<PadavalaWebAppProps> = (props) => {
  return (
    <WebAppProvider>
      <PadavalaWebContent {...props} />
    </WebAppProvider>
  );
};
