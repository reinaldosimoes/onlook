import { useEditorEngine } from '@/components/store/editor';
import { useDomainsManager } from '@/components/store/project';
import { useUserManager } from '@/components/store/user';
import { PlanKey } from '@onlook/stripe';
import { Icons } from '@onlook/ui/icons/index';
import { observer } from 'mobx-react-lite';
import { UpgradePrompt } from '../upgrade-prompt';
import { Verification } from './verification';
import { Verified } from './verified';

export const CustomDomain = observer(() => {
    const editorEngine = useEditorEngine();
    const domains = useDomainsManager();
    const userManager = useUserManager();
    const plan = userManager.subscription.plan;
    const customDomain = domains.domains.custom;

    const renderContent = () => {
        if (plan !== PlanKey.PRO) {
            return (
                <UpgradePrompt
                    onClick={() => {
                        editorEngine.state.settingsOpen = false;
                        editorEngine.state.plansOpen = true;
                    }}
                />
            );
        }
        if (customDomain) {
            return <Verified />;
        }
        return <Verification />;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-start gap-3">
                <h2 className="text-lg">Custom Domain</h2>
                {plan === PlanKey.PRO && (
                    <div className="flex h-5 items-center space-x-1 bg-blue-500/20 dark:bg-blue-500 px-2 rounded-full">
                        <Icons.Sparkles className="h-4 w-4" />
                        <span className="text-xs">Pro</span>
                    </div>
                )}
            </div>
            {renderContent()}
        </div>
    );
});
