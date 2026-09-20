import {
  Activity,
  AlertTriangle,
  ShieldEllipsis,
  UserRound,
} from "lucide-react";
import { adminDashboardStyles as s } from "../assets/dummyStyles";
import { useLibrary } from "../shared/LibraryContext";
const icons = [UserRound, Activity, ShieldEllipsis, AlertTriangle];

const AdminDashboardPage = () => {
  const { adminStats, studentSummaries } = useLibrary();
  const overdueStudents = studentSummaries.filter(
    (student) => student.status === "Overdue",
  );
  const attentionRecords = overdueStudents
    .map((student) => {
      const topOverdueRecord = student.activeBooks
        .filter((record) => record.liveStatus === "Overdue")
        .sort((first, second) => second.liveFine - first.liveFine)[0];

      if (!topOverdueRecord) {
        return null;
      }

      return {
        studentName: student.name,
        studentId: student.studentId,
        email: student.email,
        department: student.department,
        totalFine: student.totalFine,
        borrowedCount: student.borrowedCount,
        ...topOverdueRecord,
      };
    })
    .filter(Boolean)
    .sort((first, second) => second.totalFine - first.totalFine)
    .slice(0, 10);

  return (
    <div className={s.container}>
      <section className={s.heroSection}>
        <div className={s.heroInner}>
          <div>
            <span className={s.badge}>College administration workspace</span>
            <h1 className={s.heading}>
              Manage issued books, issued, student records, returns, overdue
              status, and fines.
            </h1>
            <p className={s.heroParagraph}>
              The admin area now focuses on visual trend graphs while keeping
              the existing admin workflow unchanged.
            </p>
          </div>
        </div>
      </section>
      <section className={s.statsGrid}>
        {adminStats.map((item, index) => {
          const Icon = icons[index];

          return (
            <article key={item.label} className={s.statCard}>
              <span className={s.statIcon}>
                <Icon size={20} />
              </span>
              <p className={s.statLabel}>{item.label}</p>
              <p className={s.statValue}>{item.value}</p>
              <p className={s.statNote}>{item.note}</p>
            </article>
          );
        })}
      </section>
      <section className={s.overdueSection}>
        <div className={s.overdueHeader}>
          <div>
            <h2 className={s.overdueTitle}> Overdue Attention List</h2>
            <p className={s.overdueSubtitle}>
              Top 4 overdue students ranked by total imposed fine, with the
              highest fine shown first.
            </p>
          </div>
          <span className={s.alertIcon}>
            <AlertTriangle size={20}/>
          </span>
        </div>

        <div className={s.overdueGrid}>
            {attentionRecords.length ? (
                attentionRecords.map((record, index)=>(
                    <div key={`${record.mail}-${record.id}`} className={s.overdueCard}>
                        {index ===0 ? (
                            <span className={s.mostFineBadge}>Most Fine Imposed</span>
                        ): null}
                        <div className={s.overdueCardInner}>
<div>
    <p className={s.studentName}>
        {record.studentName}
    </p>
    <p className={s.studentDetails}></p>
</div>
                        </div>
                    </div>
                )
            )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
