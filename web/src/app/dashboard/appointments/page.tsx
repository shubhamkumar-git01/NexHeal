import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, CheckCircle, XCircle, Clock } from "lucide-react";

export default function AppointmentsPage() {
  const appointments = [
    { id: 1, name: "Rahul Sharma", time: "10:30 AM", date: "Today", type: "Video Call", status: "Waiting", reason: "Fever and cold" },
    { id: 2, name: "Priya Singh", time: "11:15 AM", date: "Today", type: "In-Person", status: "Confirmed", reason: "Routine Checkup" },
    { id: 3, name: "Amit Kumar", time: "01:00 PM", date: "Today", type: "Video Call", status: "Confirmed", reason: "Follow up" },
    { id: 4, name: "Suresh Raina", time: "09:00 AM", date: "Tomorrow", type: "In-Person", status: "Pending", reason: "Back pain" },
    { id: 5, name: "Neha Gupta", time: "10:30 AM", date: "Tomorrow", type: "Video Call", status: "Pending", reason: "Skin allergy" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
          <p className="text-slate-500">Manage your daily schedule and patient meetings.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Past Appointments</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Add Walk-in</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">Patient Name</th>
                  <th className="px-6 py-3">Date & Time</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Reason</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 rounded-tr-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3">
                          {apt.name.charAt(0)}
                        </div>
                        {apt.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-700">{apt.time}</div>
                      <div className="text-xs text-slate-500">{apt.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center text-slate-700">
                        {apt.type === 'Video Call' ? <Video className="w-4 h-4 mr-1 text-blue-500" /> : <Clock className="w-4 h-4 mr-1 text-emerald-500" />}
                        {apt.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 truncate max-w-[150px]">
                      {apt.reason}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${apt.status === 'Waiting' ? 'bg-amber-100 text-amber-700' : ''}
                        ${apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${apt.status === 'Pending' ? 'bg-slate-100 text-slate-700' : ''}
                      `}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {apt.status === 'Pending' ? (
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                            <CheckCircle className="w-4 h-4 mr-1" /> Accept
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            <XCircle className="w-4 h-4 mr-1" /> Reject
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          {apt.type === 'Video Call' ? 'Join Call' : 'View Details'}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
