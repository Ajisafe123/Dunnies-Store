const team = [
  { name: "Chiamaka Obi", email: "chi@dunnis.store", role: "Admin", status: "Active" },
  { name: "Lanre Fade", email: "lanre@dunnis.store", role: "Manager", status: "Pending invite" },
  { name: "Bisi Ade", email: "bisi@dunnis.store", role: "Support", status: "Active" },
];

export default function ManageUsers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team members</h1>
          <p className="text-gray-600">
            Invite staff, assign roles, and manage account access.
          </p>
        </div>
        <button className="rounded-full bg-purple-600 text-white px-4 py-2 text-sm font-semibold hover:bg-purple-700 transition">
          Invite teammate
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {team.map((member) => (
                <tr key={member.email}>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{member.email}</td>
                  <td className="px-6 py-4">{member.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        member.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-sm font-semibold text-purple-600">
                      Edit
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
