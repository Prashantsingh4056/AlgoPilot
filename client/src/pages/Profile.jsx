import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';

export default function Profile() {
  const { user } = useAuth();

  const fields = [
    { label: 'Name', value: user?.name },
    { label: 'Email', value: user?.email },
    { label: 'Skill Level', value: user?.skillLevel },
    { label: 'Target Company', value: user?.targetCompany },
    { label: 'Daily Study Hours', value: `${user?.dailyStudyHours} hours` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-slate-400">Your AlgoPilot account details</p>
      </div>

      <Card title="Account Information">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
            <p className="text-slate-400">{user?.email}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(({ label, value }) => (
            <div key={label} className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/40">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-white font-medium mt-1">{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
