import React, { useState } from "react";
import {
  User,
  Bell,
  Globe,
  CreditCard,
  Lock,
  Database,
  ChevronRight,
  Settings as SettingsIcon,
  ScanFace,
  SquarePen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import profileIcon from "../assets/settingPageIcons/profile-icon.svg";
import notificationIcon from "../assets/settingPageIcons/notification-icon.svg";
import languageIcon from "../assets/settingPageIcons/language-icon.svg";
import subscriptionIcon from "../assets/settingPageIcons/subscription-icon.svg";
import securityIcon from "../assets/settingPageIcons/security-icon.svg";
import privacyIcon from "../assets/settingPageIcons/privacy-icon.svg";
import settingIcon from "../assets/icons/setting-icon.svg";
import PrivacyPolicyModal from "../components/dashboard/PrivacyPolicyModal";

const Settings = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null); // 'logout' | 'delete' | null
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    calendar: true,
    dialogues: true,
    weekly: false,
    push: true,
  });

  const SettingCard = ({ title, subtitle, icon, children, iconBg = "bg-white/5" }) => (
    <div className="bg-[#1C1C24] border border-white/5 rounded-[24px] p-6 sm:p-8 shadow-xl flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div className={`p-3 ${iconBg} rounded-[14px] border border-white/5`}>
          {typeof icon === "string" ? (
            <img src={icon} alt="" className="w-6 h-6 object-contain" />
          ) : (
            React.createElement(icon, { size: 24, className: "text-white/80" })
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl font-bold text-white font-inter">{title}</h3>
          <p className="text-sm text-[#A0A0A0] font-medium">{subtitle}</p>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );

  const InputField = ({ label, placeholder, value, type = "text" }) => (
    <div className="flex flex-col gap-2 mb-4">
      {label && <label className="text-sm font-semibold text-white/60 ml-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full bg-[#27282E] border border-white/5 rounded-[12px] px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#4F75FF]/50 transition-all font-inter"
      />
    </div>
  );

  const ActionButton = ({ children, variant = "primary", className = "", ...props }) => {
    const variants = {
      primary: "bg-gradient-to-t from-[#738AFF] to-[#3C56D8] hover:bg-[#3d64ef] text-white shadow-[#4F75FF]/20",
      secondary: "bg-[#27282E] hover:bg-[#34363D] text-white border border-white/5",
      danger: "bg-gradient-to-b from-[#FF6A6A] to-[#C83636] hover:bg-[#d06262] text-white",
      premium: "bg-gradient-to-b from-[#FF996A] to-[#FF6721] text-white shadow-[#FF5232]/20"
    };

    return (
      <button
        className={`w-full py-3 rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  const ToggleItem = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="flex flex-col gap-0.5 max-w-[70%]">
        <span className="text-sm font-bold text-white">{label}</span>
        <p className="text-xs text-[#A0A0A0]">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-[#4F75FF]"
      />
    </div>
  );

  const ListItem = ({ label, description, onClick, rightIcon: RightIcon, onIconClick }) => (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-[#27282E] rounded-xl mb-3 cursor-pointer hover:bg-[#34363D] transition-all border border-white/5 group"
    >
      <div className="flex-1 flex flex-col gap-0.5">
        <span className="text-sm font-bold text-white group-hover:text-white/90">{label}</span>
        <p className="text-xs text-[#A0A0A0]">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        {RightIcon && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onIconClick?.();
            }}
            className="p-1 hover:bg-white/10 rounded-md transition-colors"
          >
            <RightIcon size={20} className="text-white" />
          </div>
        )}
        <ChevronRight size={18} className="text-[#A0A0A0]" />
      </div>
    </div>
  );

  const ConfirmationModal = ({ title, confirmText, onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#1C1C24] w-full max-w-[400px] rounded-[32px] p-10 border border-white/5 shadow-2xl flex flex-col items-center gap-8 animate-in zoom-in-95 duration-300">
        <h3 className="text-[28px] font-bold text-white text-center leading-tight max-w-[280px]">
          You want to <br /> {title}
        </h3>
        <div className="flex items-center gap-4 w-full px-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-transparent border-2 border-[#E17373] text-white rounded-2xl font-bold text-lg hover:bg-[#E17373]/5 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-[#E17373] text-white rounded-2xl font-bold text-lg hover:bg-[#d06262] shadow-lg shadow-[#E17373]/20 transition-all"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="min-h-screen flex items-start justify-center overflow-auto custom-scrollbar px-3 pt-[100px] lg:pt-12 pb-6">
        <div className="relative flex w-full max-w-[1400px] text-white font-sans transition-all duration-300">
          <div className="flex-1 flex flex-col gap-8 px-4 lg:py-15 xl:p-0">
            {/* Header section */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl">
                  <img src={settingIcon} alt="" className="w-9 h-9" />
                </div>
                <h1 className="text-[32px] font-bold font-inter tracking-tight leading-none text-white">
                  Setting
                </h1>
              </div>
              <p className="text-[18px] text-[#A0A0A0] font-medium leading-tight ml-12">
                Manage your account and preference
              </p>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
              {/* Profile Information */}
              <SettingCard
                title="Profile Information"
                subtitle="Update your personal details"
                icon={profileIcon}
                iconBg="bg-[#4F75FF]/10"
              >
                <InputField label="Full Name" placeholder="Kashif..." />
                <InputField label="Email" placeholder="John@example.com" type="email" />
                <ActionButton className="mt-2">Save Changes</ActionButton>
              </SettingCard>

              {/* Notifications */}
              <SettingCard
                title="Notifications"
                subtitle="Manage your notifications preferences"
                icon={notificationIcon}
                iconBg="bg-[#E17373]/10"
              >
                <div className="flex flex-col gap-1">
                  <ToggleItem
                    label="Create calendar reminders"
                    description="Receive daily self generated exercise reminders"
                    checked={notifications.calendar}
                    onChange={(val) => setNotifications({ ...notifications, calendar: val })}
                  />
                  <ToggleItem
                    label="Skip dialogues"
                    description="Override protocol dialogues on daily use"
                    checked={notifications.dialogues}
                    onChange={(val) => setNotifications({ ...notifications, dialogues: val })}
                  />
                  <ToggleItem
                    label="Weekly Reports"
                    description="Get weekly summary reports"
                    checked={notifications.weekly}
                    onChange={(val) => setNotifications({ ...notifications, weekly: val })}
                  />
                  <ToggleItem
                    label="Receive push notifications"
                    description="Organize real alarm push notifications"
                    checked={notifications.push}
                    onChange={(val) => setNotifications({ ...notifications, push: val })}
                  />
                </div>
              </SettingCard>

              {/* Language & Region */}
              <SettingCard
                title="Language & Region"
                subtitle="Set your language and region"
                icon={languageIcon}
                iconBg="bg-[#F0B614]/10"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white/60 ml-1">Language</label>
                    <select className="w-full bg-[#27282E] border border-white/5 rounded-[12px] px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F75FF]/50 transition-all font-inter">
                      <option>English</option>
                      <option>German</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white/60 ml-1">Region</label>
                    <select className="w-full bg-[#27282E] border border-white/5 rounded-[12px] px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F75FF]/50 transition-all font-inter">
                      <option>United States</option>
                      <option>Germany</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
                <ActionButton className="mt-8">Save Changes</ActionButton>
              </SettingCard>

              {/* Subscription & Billing */}
              <SettingCard
                title="Subscription & Billing"
                subtitle="Manage your subscription & payments"
                icon={subscriptionIcon}
                iconBg="bg-[#FF8C6B]/10"
              >
                <div className="bg-[#27282E] p-6 rounded-2xl border border-white/5 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#A0A0A0]">Current Plan</span>
                    <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-bold text-white uppercase tracking-wider">Free</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Free Trial</h4>
                  <p className="text-sm text-[#A0A0A0] leading-snug font-medium">
                    Access to basic radar modules and limited statistic insights.
                  </p>
                </div>
                <ActionButton variant="premium" onClick={() => navigate("/pricing")}>Upgrade to Premium</ActionButton>
              </SettingCard>

              {/* Security */}
              <SettingCard
                title="Security"
                subtitle="Manage your account security"
                icon={securityIcon}
                iconBg="bg-[#48C856]/10"
              >
                {!isChangingPassword ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-white/60 ml-1">Password</label>
                      <div className="w-full bg-[#27282E] border border-white/5 rounded-[12px] px-4 py-3 text-white/40 font-inter">
                        ••••••••••
                      </div>
                    </div>

                    <ActionButton onClick={() => setIsChangingPassword(true)}>
                      Change Password
                    </ActionButton>

                    <div className="w-1/2 h-[2px] bg-white/10 mx-auto rounded-full" />

                    <ActionButton className="flex items-center justify-center gap-2">
                      <ScanFace size={24} />
                      Enable Face ID
                    </ActionButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <InputField label="Current Password" placeholder="••••••••" type="password" />
                    <InputField label="New Password" placeholder="••••••••" type="password" />
                    <div className="flex gap-4 mt-2">
                      <ActionButton
                        variant="secondary"
                        onClick={() => setIsChangingPassword(false)}
                      >
                        Cancel
                      </ActionButton>
                      <ActionButton onClick={() => setIsChangingPassword(false)}>
                        Save Password
                      </ActionButton>
                    </div>
                  </div>
                )}
              </SettingCard>

              {/* Data, Privacy & Sharing */}
              <SettingCard
                title="Data, Privacy & Sharing"
                subtitle="Control your data and privacy settings"
                icon={privacyIcon}
                iconBg="bg-[#E17373]/10"
              >
                <ListItem label="Contact Support" description="Get help from our team" />
                <ListItem
                  label="Privacy Policy"
                  description="Terms and privacy policy"
                  onClick={() => setIsPrivacyPolicyOpen(true)}
                />
                <ListItem
                  label="Invite Therapist"
                  description="Enter here the email(s) to share your entries with"
                  onClick={() => setIsPrivacyPolicyOpen(true)}
                  rightIcon={SquarePen}
                  onIconClick={() => navigate("/signup")}
                />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <ActionButton
                    variant="danger"
                    onClick={() => setModalType('delete')}
                  >
                    Delete Account
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={() => setModalType('logout')}
                  >
                    Log Out
                  </ActionButton>
                </div>
              </SettingCard>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {modalType === 'logout' && (
        <ConfirmationModal
          title="Log Out"
          confirmText="Log Out"
          onCancel={() => setModalType(null)}
          onConfirm={() => {
            console.log('Logging out...');
            setModalType(null);
          }}
        />
      )}
      {modalType === 'delete' && (
        <ConfirmationModal
          title="Delete Account"
          confirmText="Delete"
          onCancel={() => setModalType(null)}
          onConfirm={() => {
            console.log('Deleting account...');
            setModalType(null);
          }}
        />
      )}
      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
    </div>
  );
};

export default Settings;
