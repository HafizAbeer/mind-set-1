import React, { useState, useEffect } from "react";
import { ChevronRight, ScanFace, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/auth/AuthContext";
import {
  useUpdateProfile,
  useUpdatePreferences,
  useChangePassword,
  useRequestEmailChange,
  useConfirmEmailChange,
  useDeleteAccount,
  useInviteTherapist,
} from "@/hooks/useUser";
import profileIcon from "../assets/settingPageIcons/profile-icon.svg";
import notificationIcon from "../assets/settingPageIcons/notification-icon.svg";
import languageIcon from "../assets/settingPageIcons/language-icon.svg";
import subscriptionIcon from "../assets/settingPageIcons/subscription-icon.svg";
import securityIcon from "../assets/settingPageIcons/security-icon.svg";
import privacyIcon from "../assets/settingPageIcons/privacy-icon.svg";
import settingIcon from "../assets/icons/setting-icon.svg";
import PrivacyPolicyModal from "../components/dashboard/PrivacyPolicyModal";

const SUPPORT_EMAIL = "support@mind-set.app";

/* ---------- Presentational helpers (hoisted: not re-created each render) ---------- */

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

const InputField = ({ label, placeholder, value, onChange, name, type = "text" }) => (
  <div className="flex flex-col gap-2 mb-4">
    {label && (
      <label className="text-sm font-semibold text-white/60 ml-1">{label}</label>
    )}
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      className="w-full bg-[#27282E] border border-white/5 rounded-[12px] px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#4F75FF]/50 transition-all font-inter"
    />
  </div>
);

const ActionButton = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary:
      "bg-gradient-to-t from-[#738AFF] to-[#3C56D8] hover:bg-[#3d64ef] text-white shadow-[#4F75FF]/20",
    secondary: "bg-[#27282E] hover:bg-[#34363D] text-white border border-white/5",
    danger: "bg-gradient-to-b from-[#FF6A6A] to-[#C83636] hover:bg-[#d06262] text-white",
    premium: "bg-gradient-to-b from-[#FF996A] to-[#FF6721] text-white shadow-[#FF5232]/20",
  };
  return (
    <button
      className={`w-full py-3 rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const ToggleItem = ({ label, description, checked, onChange, disabled }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
    <div className="flex flex-col gap-0.5 max-w-[70%]">
      <span className="text-sm font-bold text-white">{label}</span>
      <p className="text-xs text-[#A0A0A0]">{description}</p>
    </div>
    <Switch
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
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

const ModalShell = ({ children }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="bg-[#1C1C24] w-full max-w-[420px] rounded-[32px] p-8 sm:p-10 border border-white/5 shadow-2xl flex flex-col gap-6 animate-in zoom-in-95 duration-300">
      {children}
    </div>
  </div>
);

const ConfirmationModal = ({ title, confirmText, onConfirm, onCancel, busy }) => (
  <ModalShell>
    <h3 className="text-[28px] font-bold text-white text-center leading-tight">
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
        disabled={busy}
        className="flex-1 py-3 bg-[#E17373] text-white rounded-2xl font-bold text-lg hover:bg-[#d06262] shadow-lg shadow-[#E17373]/20 transition-all disabled:opacity-50"
      >
        {busy ? "…" : confirmText}
      </button>
    </div>
  </ModalShell>
);

const Toast = ({ notice }) =>
  notice ? (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold text-white animate-in slide-in-from-bottom-4"
      style={{ background: notice.type === "error" ? "#C83636" : "#2F7D4F" }}>
      {notice.message}
    </div>
  ) : null;

/* ---------- Page ---------- */

const Settings = () => {
  const navigate = useNavigate();
  const { user, login, logout, setUser } = useAuth();

  const updateProfile = useUpdateProfile();
  const updatePreferences = useUpdatePreferences();
  const changePassword = useChangePassword();
  const requestEmailChange = useRequestEmailChange();
  const confirmEmailChange = useConfirmEmailChange();
  const deleteAccount = useDeleteAccount();
  const inviteTherapist = useInviteTherapist();

  const [notice, setNotice] = useState(null);
  const showNotice = (type, message) => {
    setNotice({ type, message });
    setTimeout(() => setNotice(null), 3500);
  };

  // Profile fields (seeded from the authoritative user once it's available).
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  // Preferences (seeded from user.preferences).
  const [prefs, setPrefs] = useState(() => user?.preferences || null);

  useEffect(() => {
    if (user) {
      setName((n) => n || user.name || "");
      setEmail((e) => e || user.email || "");
      if (user.preferences) setPrefs(user.preferences);
    }
  }, [user]);

  const notifications = prefs?.notifications || {
    calendar: true,
    dialogues: true,
    weekly: false,
    push: false,
  };
  const language = prefs?.language || "en";
  const region = prefs?.region || "US";

  const [modalType, setModalType] = useState(null); // 'logout'
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [awaitingEmailCode, setAwaitingEmailCode] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");

  /* ----- handlers ----- */

  const handleSaveProfile = async () => {
    try {
      if (name.trim() && name.trim() !== user?.name) {
        const updated = await updateProfile.mutateAsync({ name: name.trim() });
        setUser(updated);
        showNotice("success", "Profile updated");
      }
      if (email.trim() && email.trim().toLowerCase() !== (user?.email || "").toLowerCase()) {
        await requestEmailChange.mutateAsync(email.trim());
        setAwaitingEmailCode(true);
        showNotice("success", "Confirmation code sent to the new email");
      }
    } catch (err) {
      showNotice("error", err.message);
    }
  };

  const handleConfirmEmail = async () => {
    try {
      const updated = await confirmEmailChange.mutateAsync(emailCode.trim());
      setUser(updated);
      setEmail(updated.email);
      setAwaitingEmailCode(false);
      setEmailCode("");
      showNotice("success", "Email updated");
    } catch (err) {
      showNotice("error", err.message);
    }
  };

  const persistPreferences = async (patch, optimistic) => {
    const previous = prefs;
    setPrefs(optimistic); // optimistic update
    try {
      const res = await updatePreferences.mutateAsync(patch);
      setPrefs(res.preferences);
    } catch (err) {
      setPrefs(previous); // rollback
      showNotice("error", err.message);
    }
  };

  const handleToggle = (key, val) => {
    const optimistic = {
      ...(prefs || {}),
      notifications: { ...notifications, [key]: val },
    };
    persistPreferences({ notifications: { [key]: val } }, optimistic);
  };

  const handleSaveRegion = async () => {
    try {
      const res = await updatePreferences.mutateAsync({ language, region });
      setPrefs(res.preferences);
      showNotice("success", "Language & region saved");
    } catch (err) {
      showNotice("error", err.message);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 8) {
      showNotice("error", "New password must be at least 8 characters");
      return;
    }
    try {
      const res = await changePassword.mutateAsync({ currentPassword, newPassword });
      if (res.token) login(res.token, user); // keep this session alive
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      showNotice("success", "Password updated");
    } catch (err) {
      showNotice("error", err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount.mutateAsync({ password: deletePassword, confirm: deleteConfirm });
      setShowDelete(false);
      logout();
    } catch (err) {
      showNotice("error", err.message);
    }
  };

  const handleInvite = async () => {
    const emails = inviteEmails
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    if (emails.length === 0) {
      showNotice("error", "Enter at least one email");
      return;
    }
    try {
      const res = await inviteTherapist.mutateAsync(emails);
      setShowInvite(false);
      setInviteEmails("");
      showNotice("success", res.message);
    } catch (err) {
      showNotice("error", err.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="min-h-screen flex items-start justify-center overflow-auto custom-scrollbar px-8 pt-[100px] lg:pt-12 pb-6">
        <div className="relative flex w-full max-w-[1400px] text-white font-sans transition-all duration-300">
          <div className="flex-1 flex flex-col gap-8 px-4 lg:py-15 xl:p-0">
            {/* Header */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
              {/* Profile */}
              <SettingCard
                title="Profile Information"
                subtitle="Update your personal details"
                icon={profileIcon}
                iconBg="bg-[#4F75FF]/10"
              >
                <InputField
                  label="Full Name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputField
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {awaitingEmailCode && (
                  <div className="flex gap-3 items-end mb-2">
                    <div className="flex-1">
                      <InputField
                        label="Email confirmation code"
                        placeholder="6-digit code"
                        value={emailCode}
                        onChange={(e) => setEmailCode(e.target.value)}
                      />
                    </div>
                    <ActionButton
                      className="!w-auto px-5 mb-4"
                      onClick={handleConfirmEmail}
                      disabled={confirmEmailChange.isPending}
                    >
                      Confirm
                    </ActionButton>
                  </div>
                )}
                <ActionButton
                  className="mt-2"
                  onClick={handleSaveProfile}
                  disabled={updateProfile.isPending || requestEmailChange.isPending}
                >
                  {updateProfile.isPending || requestEmailChange.isPending
                    ? "Saving…"
                    : "Save Changes"}
                </ActionButton>
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
                    onChange={(val) => handleToggle("calendar", val)}
                  />
                  <ToggleItem
                    label="Skip dialogues"
                    description="Override protocol dialogues on daily use"
                    checked={notifications.dialogues}
                    onChange={(val) => handleToggle("dialogues", val)}
                  />
                  <ToggleItem
                    label="Weekly Reports"
                    description="Get weekly summary reports"
                    checked={notifications.weekly}
                    onChange={(val) => handleToggle("weekly", val)}
                  />
                  <ToggleItem
                    label="Receive push notifications"
                    description="Coming soon in the mobile app"
                    checked={notifications.push}
                    onChange={(val) => handleToggle("push", val)}
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
                    <select
                      value={language}
                      onChange={(e) => setPrefs({ ...(prefs || {}), language: e.target.value })}
                      className="w-full bg-[#27282E] border border-white/5 rounded-[12px] px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F75FF]/50 transition-all font-inter"
                    >
                      <option value="en">English</option>
                      <option value="de">German</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white/60 ml-1">Region</label>
                    <select
                      value={region}
                      onChange={(e) => setPrefs({ ...(prefs || {}), region: e.target.value })}
                      className="w-full bg-[#27282E] border border-white/5 rounded-[12px] px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F75FF]/50 transition-all font-inter"
                    >
                      <option value="US">United States</option>
                      <option value="DE">Germany</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>
                <ActionButton
                  className="mt-8"
                  onClick={handleSaveRegion}
                  disabled={updatePreferences.isPending}
                >
                  Save Changes
                </ActionButton>
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
                    <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                      {user?.plan === "pro" ? "Pro" : "Free"}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {user?.plan === "pro" ? "Pro" : "Free Trial"}
                  </h4>
                  <p className="text-sm text-[#A0A0A0] leading-snug font-medium">
                    Access to basic radar modules and limited statistic insights.
                  </p>
                </div>
                <ActionButton variant="premium" onClick={() => navigate("/pricing")}>
                  Upgrade to Premium
                </ActionButton>
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
                    <ActionButton
                      variant="secondary"
                      className="flex items-center justify-center gap-2 cursor-not-allowed"
                      disabled
                      title="Available in the mobile app"
                    >
                      <ScanFace size={24} />
                      Enable Face ID (mobile only)
                    </ActionButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <InputField
                      label="Current Password"
                      placeholder="••••••••"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <InputField
                      label="New Password"
                      placeholder="••••••••"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="flex gap-4 mt-2">
                      <ActionButton
                        variant="secondary"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setCurrentPassword("");
                          setNewPassword("");
                        }}
                      >
                        Cancel
                      </ActionButton>
                      <ActionButton onClick={handleChangePassword} disabled={changePassword.isPending}>
                        {changePassword.isPending ? "Saving…" : "Save Password"}
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
                <ListItem
                  label="Contact Support"
                  description="Get help from our team"
                  onClick={() => {
                    window.location.href = `mailto:${SUPPORT_EMAIL}`;
                  }}
                />
                <ListItem
                  label="Privacy Policy"
                  description="Terms and privacy policy"
                  onClick={() => setIsPrivacyPolicyOpen(true)}
                />
                <ListItem
                  label="Invite Therapist"
                  description="Enter here the email(s) to share your entries with"
                  onClick={() => setShowInvite(true)}
                  rightIcon={SquarePen}
                  onIconClick={() => setShowInvite(true)}
                />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <ActionButton variant="danger" onClick={() => setShowDelete(true)}>
                    Delete Account
                  </ActionButton>
                  <ActionButton variant="danger" onClick={() => setModalType("logout")}>
                    Log Out
                  </ActionButton>
                </div>
              </SettingCard>
            </div>
          </div>
        </div>
      </div>

      {/* Logout confirmation */}
      {modalType === "logout" && (
        <ConfirmationModal
          title="Log Out"
          confirmText="Log Out"
          onCancel={() => setModalType(null)}
          onConfirm={() => {
            setModalType(null);
            logout();
          }}
        />
      )}

      {/* Delete account */}
      {showDelete && (
        <ModalShell>
          <h3 className="text-[24px] font-bold text-white text-center leading-tight">
            Delete your account?
          </h3>
          <p className="text-sm text-[#A0A0A0] text-center -mt-2">
            This permanently erases your account and data. Type <b>DELETE</b> and your password to confirm.
          </p>
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
          <InputField
            label='Type "DELETE"'
            placeholder="DELETE"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
          />
          <div className="flex items-center gap-4 w-full">
            <button
              onClick={() => setShowDelete(false)}
              className="flex-1 py-3 bg-transparent border-2 border-white/20 text-white rounded-2xl font-bold hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteAccount.isPending}
              className="flex-1 py-3 bg-[#E17373] text-white rounded-2xl font-bold hover:bg-[#d06262] transition-all disabled:opacity-50"
            >
              {deleteAccount.isPending ? "…" : "Delete"}
            </button>
          </div>
        </ModalShell>
      )}

      {/* Invite therapist */}
      {showInvite && (
        <ModalShell>
          <h3 className="text-[24px] font-bold text-white text-center leading-tight">
            Invite a therapist
          </h3>
          <p className="text-sm text-[#A0A0A0] text-center -mt-2">
            Enter one or more emails (comma-separated) to invite.
          </p>
          <InputField
            label="Email(s)"
            placeholder="therapist@example.com, ..."
            value={inviteEmails}
            onChange={(e) => setInviteEmails(e.target.value)}
          />
          <div className="flex items-center gap-4 w-full">
            <ActionButton variant="secondary" onClick={() => setShowInvite(false)}>
              Cancel
            </ActionButton>
            <ActionButton onClick={handleInvite} disabled={inviteTherapist.isPending}>
              {inviteTherapist.isPending ? "Sending…" : "Send Invite"}
            </ActionButton>
          </div>
        </ModalShell>
      )}

      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />

      <Toast notice={notice} />
    </div>
  );
};

export default Settings;
