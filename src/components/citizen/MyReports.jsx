import Icon from "../icons/Icon.jsx";
import { Empty } from "../ui/Primitives.jsx";
import StarRating from "../ui/StarRating.jsx";
import IssueCard from "./IssueCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { fmtDate } from "../../utils/helpers";

export default function MyReports() {
  const { session } = useAuth();
  const { issues, rateIssue } = useData();
  const push = useToast();
  const mine = issues.filter((i) => i.citizenId === session.userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (mine.length === 0) {
    return <Empty icon="list" title="No reports yet" message="Issues you report will show up here with live status and, once resolved, a place to rate the fix." />;
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {mine.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          footer={
            <div className="mt-4 pt-4 border-t border-white/5">
              {issue.status === "Resolved" ? (
                issue.rating ? (
                  <div className="flex items-center gap-2">
                    <StarRating value={issue.rating} readOnly />
                    <span className="text-xs text-ink-lo">rated {fmtDate(issue.ratingAt)}</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-ink-mid mb-2">Resolved — rate how this was handled:</p>
                    <StarRating
                      value={0}
                      onRate={(s) => {
                        rateIssue(issue.id, s);
                        push("Thanks for rating " + issue.id + "!", "success");
                      }}
                    />
                  </div>
                )
              ) : (
                <p className="text-xs text-ink-lo flex items-center gap-1.5">
                  <Icon name="info" size={12} /> Rating unlocks once this issue is marked Resolved.
                </p>
              )}
            </div>
          }
        />
      ))}
    </div>
  );
}
