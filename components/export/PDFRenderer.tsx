import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

// Register fonts if needed, e.g.
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#334155",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    fontSize: 8,
    color: "#64748b",
  },
  main: {
    flexDirection: "row",
    gap: 30,
  },
  content: {
    flex: 2,
  },
  sidebar: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    paddingBottom: 2,
    marginBottom: 10,
    marginTop: 15,
  },
  summary: {
    lineHeight: 1.5,
  },
  entry: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  entryTitle: {
    fontWeight: "bold",
    color: "#0f172a",
  },
  entrySubtitle: {
    color: "#64748b",
    fontSize: 9,
    marginBottom: 4,
  },
  bullet: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 2,
    paddingLeft: 5,
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.4,
  },
  tag: {
    padding: "2 4",
    backgroundColor: "#f8fafc",
    borderRadius: 2,
    fontSize: 8,
    marginBottom: 4,
    marginRight: 4,
  }
});

interface PDFProps {
  data: ResumeData;
  settings: {
    templateId: string;
    accentColor: string;
    fontSize: number;
    lineHeight: number;
    margin: number;
  };
}

export const PDFRenderer = ({ data, settings }: PDFProps) => {
  const { templateId, accentColor, fontSize, lineHeight, margin } = settings;

  // Shared Styles Generator
  const createStyles = (isSerif = false) => StyleSheet.create({
    page: {
      padding: margin,
      fontFamily: isSerif ? "Times-Roman" : "Helvetica",
      fontSize: fontSize,
      color: "#334155",
      lineHeight: lineHeight,
    },
    sectionTitle: {
      fontSize: fontSize - 2,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1.5,
      borderBottomWidth: 1,
      borderBottomColor: accentColor,
      paddingBottom: 2,
      marginBottom: 10,
      marginTop: 15,
      color: "#0f172a",
    },
    // ... add more shared styles as needed
  });

  if (templateId === "meridian") {
    return <MeridianPDF data={data} settings={settings} />;
  }

  if (templateId === "atlas") {
    return <AtlasPDF data={data} settings={settings} />;
  }

  if (templateId === "prism") {
    return <PrismPDF data={data} settings={settings} />;
  }

  if (templateId === "scholar") {
    return <ScholarPDF data={data} settings={settings} />;
  }

  if (templateId === "compact") {
    return <CompactPDF data={data} settings={settings} />;
  }

  if (templateId === "cascade") {
    return <CascadePDF data={data} settings={settings} />;
  }

  if (templateId === "minimo") {
    return <MinimoPDF data={data} settings={settings} />;
  }

  if (templateId === "arya") {
    return <AryaPDF data={data} settings={settings} />;
  }

  if (templateId === "executive") {
    return <ExecutivePDF data={data} settings={settings} />;
  }

  // Default: Nexus (2-column)
  return <NexusPDF data={data} settings={settings} />;
};

// --- Sub-components for each template ---

const NexusPDF = ({ data, settings }: { data: ResumeData, settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const styles = StyleSheet.create({
    page: { padding: margin, fontFamily: "Helvetica", fontSize: fontSize, color: "#334155", lineHeight },
    header: { marginBottom: 20, textAlign: "center" },
    name: { fontSize: fontSize * 2, fontWeight: "bold", textTransform: "uppercase", marginBottom: 4, color: accentColor },
    title: { fontSize: fontSize + 2, color: "#64748b", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 },
    main: { flexDirection: "row", gap: 30 },
    content: { flex: 2 },
    sidebar: { flex: 1 },
    sectionTitle: { fontSize: fontSize - 4, fontWeight: "bold", textTransform: "uppercase", borderBottomWidth: 1, borderBottomColor: accentColor, paddingBottom: 2, marginBottom: 10, marginTop: 15 },
    entry: { marginBottom: 12 },
    entryTitle: { fontWeight: "bold", fontSize: fontSize, color: "#0f172a" },
    entrySubtitle: { fontSize: fontSize - 2, color: "#64748b", marginBottom: 2 },
    bullet: { flexDirection: "row", gap: 5, marginBottom: 2 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.firstName} {data.personal.lastName}</Text>
          <Text style={styles.title}>{data.personal.title}</Text>
          <Text style={{ fontSize: fontSize - 4, color: "#64748b" }}>
            {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" | ")}
          </Text>
        </View>
        <View style={styles.main}>
          <View style={styles.content}>
            {data.sectionVisibility?.summary !== false && data.summary && (
              <View style={styles.entry}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={{ fontSize: fontSize - 2, lineHeight: 1.5 }}>{data.summary}</Text>
              </View>
            )}

            {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Projects</Text>
                {data.projects.map((proj: any) => (
                  <View key={proj.id} style={styles.entry}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={styles.entryTitle}>{proj.name}</Text>
                      <Text style={{ fontSize: fontSize - 4, color: "#64748b" }}>{proj.startDate} - {proj.endDate}</Text>
                    </View>
                    <Text style={{ fontSize: fontSize - 2, marginTop: 2 }}>{proj.description}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.sectionVisibility?.experience !== false && data.experience && data.experience.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Experience</Text>
                {data.experience.map((exp: any) => (
                  <View key={exp.id} style={styles.entry}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                      <Text style={styles.entryTitle}>{exp.role}</Text>
                      <Text style={{ fontSize: fontSize - 4, color: "#64748b" }}>{exp.startDate} - {exp.endDate}</Text>
                    </View>
                    <Text style={{ fontSize: fontSize - 2, color: accentColor, fontWeight: "bold", marginBottom: 3 }}>{exp.company}</Text>
                    {exp.bullets.map((b: string, i: number) => <Text key={i} style={{ fontSize: fontSize - 2, marginBottom: 2 }}>• {b}</Text>)}
                  </View>
                ))}
              </View>
            )}

            {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Publications</Text>
                {data.publications.map((pub: any) => (
                  <View key={pub.id} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1, color: "#0f172a" }}>{pub.title}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: "#64748b" }}>{pub.publisher} • {pub.date}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Additional Experience</Text>
                {data.custom.map((cust: any) => (
                  <View key={cust.id} style={styles.entry}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                      <Text style={styles.entryTitle}>{cust.title}</Text>
                      <Text style={{ fontSize: fontSize - 4, color: "#64748b" }}>{cust.date}</Text>
                    </View>
                    <Text style={{ fontSize: fontSize - 2, color: accentColor, fontWeight: "bold", marginBottom: 3 }}>{cust.subtitle}</Text>
                    <Text style={{ fontSize: fontSize - 2 }}>{cust.description}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.sectionVisibility?.references !== false && data.references && (
              <View>
                <Text style={styles.sectionTitle}>References</Text>
                <Text style={{ fontSize: fontSize - 2, fontStyle: "italic", color: "#475569" }}>{data.references}</Text>
              </View>
            )}
          </View>

          <View style={styles.sidebar}>
            {data.sectionVisibility?.skills !== false && data.skills && data.skills.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Skills</Text>
                {data.skills.map((s: any) => (
                  <View key={s.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: fontSize - 4, fontWeight: "bold", color: "#64748b", textTransform: "uppercase", marginBottom: 2 }}>{s.category}</Text>
                    <Text style={{ fontSize: fontSize - 2 }}>{s.skills.join(", ")}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.sectionVisibility?.education !== false && data.education && data.education.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu: any) => (
                  <View key={edu.id} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1, color: "#0f172a" }}>{edu.degree}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569" }}>{edu.school}</Text>
                    <Text style={{ fontSize: fontSize - 4, color: "#94a3b8", marginTop: 1 }}>{edu.startYear} - {edu.endYear}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {data.certifications.map((cert: any) => (
                  <View key={cert.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 2, color: "#0f172a" }}>{cert.name}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: "#64748b" }}>{cert.issuer}</Text>
                    <Text style={{ fontSize: fontSize - 4, color: "#94a3b8" }}>{cert.date}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Languages</Text>
                {data.languages.map((lang: any) => (
                  <View key={lang.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 2, color: "#0f172a" }}>{lang.name}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: "#64748b" }}>{lang.proficiency}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Grants</Text>
                {data.grants.map((grant: any) => (
                  <View key={grant.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 2, color: "#0f172a" }}>{grant.title}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: "#64748b" }}>{grant.organization}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: accentColor, fontWeight: "bold" }}>{grant.amount}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Teaching</Text>
                {data.teaching.map((t: any) => (
                  <View key={t.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 2, color: "#0f172a" }}>{t.course}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: "#64748b" }}>{t.institution}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const MeridianPDF = ({ data, settings }: { data: ResumeData, settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const styles = StyleSheet.create({
    page: { padding: margin, fontFamily: "Times-Roman", fontSize: fontSize, color: "#1a1a1a", lineHeight },
    header: { borderBottomWidth: 2, borderBottomColor: "#000", paddingBottom: 10, marginBottom: 20 },
    name: { fontSize: fontSize * 2.5, fontWeight: "bold", color: accentColor, marginBottom: 4 },
    contact: { fontSize: fontSize - 1, color: "#4b5563" },
    sectionTitle: { fontSize: fontSize + 2, fontWeight: "bold", textTransform: "uppercase", borderBottomWidth: 1, borderBottomColor: "#e5e7eb", marginTop: 20, marginBottom: 10, paddingBottom: 3, letterSpacing: 1 },
    entry: { marginBottom: 15 },
    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 },
    title: { fontWeight: "bold", fontSize: fontSize + 1 },
    subtitle: { color: accentColor, fontWeight: "bold", fontSize: fontSize - 1, textTransform: "uppercase", marginBottom: 4 },
    date: { fontSize: fontSize - 2, color: "#6b7280" },
    text: { fontSize: fontSize, lineHeight: 1.5 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.firstName} {data.personal.lastName}</Text>
          <Text style={styles.contact}>
            {[data.personal.title, data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join("  |  ")}
          </Text>
        </View>

        {data.sectionVisibility?.summary !== false && data.summary && (
          <View>
            <Text style={styles.sectionTitle}>Professional Profile</Text>
            <Text style={{ ...styles.text, fontStyle: "italic", color: "#374151" }}>{data.summary}</Text>
          </View>
        )}

        {data.sectionVisibility?.experience !== false && data.experience && data.experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp: any) => (
              <View key={exp.id} style={styles.entry}>
                <View style={styles.row}>
                  <Text style={styles.title}>{exp.role}</Text>
                  <Text style={styles.date}>{exp.startDate} — {exp.endDate}</Text>
                </View>
                <Text style={styles.subtitle}>{exp.company}</Text>
                {exp.bullets.map((b: string, i: number) => (
                  <Text key={i} style={styles.text}>•  {b}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education & Skills Grid wrapper for 2 columns if we want, but Meridian PDF can just be sequential for simplicity since it's A4 vertical. Let's make it two columns to match the web view. */}
        <View style={{ flexDirection: "row", gap: 30, marginTop: 10 }}>
          {data.sectionVisibility?.education !== false && data.education && data.education.length > 0 && (
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.sectionTitle, marginTop: 10 }}>Education</Text>
              {data.education.map((edu: any) => (
                <View key={edu.id} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{edu.degree}</Text>
                  <Text style={{ fontSize: fontSize - 1, textTransform: "uppercase", color: "#4b5563", marginTop: 2 }}>{edu.school}</Text>
                  <Text style={{ fontSize: fontSize - 2, color: "#6b7280", marginTop: 2 }}>{edu.startYear} — {edu.endYear}</Text>
                </View>
              ))}
            </View>
          )}

          {data.sectionVisibility?.skills !== false && data.skills && data.skills.length > 0 && (
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.sectionTitle, marginTop: 10 }}>Expertise</Text>
              {data.skills.map((group: any) => (
                <View key={group.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: fontSize - 3, fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", marginBottom: 2 }}>{group.category}</Text>
                  <Text style={styles.text}>{group.skills.join(" • ")}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={{ flexDirection: "row", gap: 30, marginTop: 10 }}>
          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.sectionTitle, marginTop: 10 }}>Languages</Text>
              {data.languages.map((lang: any) => (
                <View key={lang.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                  <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{lang.name}</Text>
                  <Text style={{ fontSize: fontSize - 2, color: "#6b7280", textTransform: "uppercase" }}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>
          )}

          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.sectionTitle, marginTop: 10 }}>Certifications</Text>
              {data.certifications.map((cert: any) => (
                <View key={cert.id} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{cert.name}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                    <Text style={{ fontSize: fontSize - 1, color: "#6b7280" }}>{cert.issuer}</Text>
                    <Text style={{ fontSize: fontSize - 2, fontWeight: "bold", textTransform: "uppercase" }}>{cert.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Selected Projects</Text>
            {data.projects.map((proj: any) => (
              <View key={proj.id} style={styles.entry}>
                <Text style={{ fontWeight: "bold", fontSize: fontSize, marginBottom: 2 }}>{proj.name}</Text>
                <Text style={{ ...styles.text, color: "#374151", marginBottom: 4 }}>{proj.description}</Text>
                {proj.techStack && proj.techStack.length > 0 && (
                  <Text style={{ fontSize: fontSize - 3, fontWeight: "bold", color: "#9ca3af", textTransform: "uppercase" }}>
                    {proj.techStack.join("  •  ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Publications</Text>
            {data.publications.map((pub: any) => (
              <View key={pub.id} style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{pub.title}</Text>
                <Text style={{ fontSize: fontSize - 1, color: "#6b7280", marginTop: 2 }}>{pub.publisher} • {pub.date}</Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Grants & Funding</Text>
            {data.grants.map((grant: any) => (
              <View key={grant.id} style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{grant.title}</Text>
                <Text style={{ fontSize: fontSize - 1, color: "#6b7280", marginTop: 2 }}>
                  {grant.organization}   |   <Text style={{ color: accentColor, fontWeight: "bold" }}>{grant.amount}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Teaching Experience</Text>
            {data.teaching.map((t: any) => (
              <View key={t.id} style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{t.course}</Text>
                <Text style={{ fontSize: fontSize - 1, color: "#6b7280", marginTop: 2 }}>{t.institution} • {t.date}</Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Additional Details</Text>
            {data.custom.map((cust: any) => (
              <View key={cust.id} style={styles.entry}>
                <View style={styles.row}>
                  <Text style={styles.title}>{cust.title}</Text>
                  <Text style={styles.date}>{cust.date}</Text>
                </View>
                <Text style={styles.subtitle}>{cust.subtitle}</Text>
                <Text style={styles.text}>{cust.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.references !== false && data.references && (
          <View>
            <Text style={styles.sectionTitle}>References</Text>
            <Text style={{ ...styles.text, fontStyle: "italic", color: "#374151" }}>{data.references}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

const AtlasPDF = ({ data, settings }: { data: ResumeData, settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const styles = StyleSheet.create({
    page: { flexDirection: "row", backgroundColor: "#fff", fontFamily: "Helvetica", lineHeight },
    sidebar: { width: "30%", backgroundColor: "#0f172a", color: "#f8fafc", padding: margin, height: "100%" },
    main: { width: "70%", padding: margin, color: "#1e293b", height: "100%" },
    name: { fontSize: fontSize * 2, fontWeight: "bold", marginBottom: 2, lineHeight: 1.1, color: "#fff" },
    lastName: { color: accentColor },
    title: { fontSize: fontSize - 2, textTransform: "uppercase", color: "#94a3b8", letterSpacing: 1, marginBottom: 20 },
    contactItem: { flexDirection: "row", alignItems: "center", marginBottom: 6, fontSize: fontSize - 3 },
    sidebarTitle: { fontSize: fontSize - 3, fontWeight: "bold", textTransform: "uppercase", color: "#64748b", marginTop: 20, marginBottom: 8, letterSpacing: 2 },
    mainTitle: { fontSize: fontSize - 1, fontWeight: "bold", textTransform: "uppercase", borderBottomWidth: 1, borderBottomColor: "#e2e8f0", paddingBottom: 4, marginBottom: 15, marginTop: 15, color: "#0f172a" },
    bullet: { flexDirection: "row", gap: 5, marginBottom: 3 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <Text style={styles.name}>
            {data.personal.firstName}
            <Text style={styles.lastName}> {data.personal.lastName}</Text>
          </Text>
          <Text style={styles.title}>{data.personal.title}</Text>

          <Text style={styles.sidebarTitle}>Contact</Text>
          {data.personal.email && <Text style={styles.contactItem}>{data.personal.email}</Text>}
          {data.personal.phone && <Text style={styles.contactItem}>{data.personal.phone}</Text>}
          {data.personal.location && <Text style={styles.contactItem}>{data.personal.location}</Text>}

          {data.sectionVisibility?.skills !== false && data.skills && data.skills.length > 0 && (
            <View>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {data.skills.map((s: any) => (
                <View key={s.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: fontSize - 4, fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", marginBottom: 2 }}>{s.category}</Text>
                  <Text style={{ fontSize: fontSize - 3 }}>{s.skills.join(", ")}</Text>
                </View>
              ))}
            </View>
          )}

          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <View>
              <Text style={styles.sidebarTitle}>Languages</Text>
              {data.languages.map((lang: any) => (
                <View key={lang.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: fontSize - 2, fontWeight: "bold", color: "#f8fafc" }}>{lang.name}</Text>
                  <Text style={{ fontSize: fontSize - 4, color: "#94a3b8", textTransform: "uppercase" }}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>
          )}

          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <View>
              <Text style={styles.sidebarTitle}>Certifications</Text>
              {data.certifications.map((cert: any) => (
                <View key={cert.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: fontSize - 3, fontWeight: "bold", color: "#f8fafc" }}>{cert.name}</Text>
                  <Text style={{ fontSize: fontSize - 4, color: "#94a3b8" }}>{cert.issuer}</Text>
                  <Text style={{ fontSize: fontSize - 5, color: "#64748b", marginTop: 1 }}>{cert.date}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.main}>
          {data.sectionVisibility?.summary !== false && data.summary && (
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: fontSize, color: "#475569", lineHeight: 1.5, fontStyle: "italic" }}>{`"${data.summary}"`}</Text>
            </View>
          )}

          {data.sectionVisibility?.experience !== false && data.experience && data.experience.length > 0 && (
            <View>
              <Text style={styles.mainTitle}>Experience</Text>
              {data.experience.map((exp: any) => (
                <View key={exp.id} style={{ marginBottom: 15, paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: "#e2e8f0" }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{exp.role}</Text>
                    <Text style={{ fontSize: fontSize - 4, fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" }}>{exp.startDate} - {exp.endDate}</Text>
                  </View>
                  <Text style={{ fontSize: fontSize - 2, fontWeight: "bold", color: accentColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>{exp.company}</Text>
                  {exp.bullets.map((b: string, i: number) => (
                    <Text key={i} style={{ fontSize: fontSize - 1, color: "#475569", marginBottom: 3, lineHeight: 1.4 }}>• {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {data.sectionVisibility?.education !== false && data.education && data.education.length > 0 && (
            <View>
              <Text style={styles.mainTitle}>Education</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 15 }}>
                {data.education.map((edu: any) => (
                  <View key={edu.id} style={{ width: "45%", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{edu.degree}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569", marginTop: 2 }}>{edu.school}</Text>
                    <Text style={{ fontSize: fontSize - 4, fontWeight: "bold", color: "#94a3b8", marginTop: 3, textTransform: "uppercase", letterSpacing: 1 }}>{edu.startYear} - {edu.endYear}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
            <View>
              <Text style={styles.mainTitle}>Projects</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 15 }}>
                {data.projects.map((proj: any) => (
                  <View key={proj.id} style={{ width: "45%", marginBottom: 15, padding: 8, backgroundColor: "#f8fafc", borderRadius: 4 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{proj.name}</Text>
                    <Text style={{ fontSize: fontSize - 4, fontWeight: "bold", color: "#94a3b8", marginTop: 2, marginBottom: 4, textTransform: "uppercase" }}>{proj.startDate} {proj.endDate ? `— ${proj.endDate}` : ""}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: "#475569", lineHeight: 1.4 }}>{proj.description}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
            <View>
              <Text style={styles.mainTitle}>Publications</Text>
              {data.publications.map((pub: any) => (
                <View key={pub.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{pub.title}</Text>
                  <Text style={{ fontSize: fontSize - 2, color: "#64748b", marginTop: 1 }}>{pub.publisher} | {pub.date}</Text>
                </View>
              ))}
            </View>
          )}

          {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
            <View>
              <Text style={styles.mainTitle}>Grants & Funding</Text>
              {data.grants.map((grant: any) => (
                <View key={grant.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{grant.title}</Text>
                  <Text style={{ fontSize: fontSize - 2, color: "#64748b", marginTop: 1, fontStyle: "italic" }}>
                    <Text style={{ color: accentColor }}>{grant.amount}</Text> — {grant.organization}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
            <View>
              <Text style={styles.mainTitle}>Teaching Activity</Text>
              {data.teaching.map((t: any) => (
                <View key={t.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{t.course}</Text>
                  <Text style={{ fontSize: fontSize - 2, color: "#64748b", marginTop: 1 }}>{t.institution} • {t.date}</Text>
                </View>
              ))}
            </View>
          )}

          {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
            <View>
              <Text style={styles.mainTitle}>Additional Experience</Text>
              {data.custom.map((cust: any) => (
                <View key={cust.id} style={{ marginBottom: 12, paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: "#e2e8f0" }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{cust.title}</Text>
                    <Text style={{ fontSize: fontSize - 4, fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" }}>{cust.date}</Text>
                  </View>
                  <Text style={{ fontSize: fontSize - 3, fontWeight: "bold", color: accentColor, textTransform: "uppercase", marginTop: 2, marginBottom: 3 }}>{cust.subtitle}</Text>
                  <Text style={{ fontSize: fontSize - 2, color: "#475569", lineHeight: 1.4 }}>{cust.description}</Text>
                </View>
              ))}
            </View>
          )}

          {data.sectionVisibility?.references !== false && data.references && (
            <View>
              <Text style={styles.mainTitle}>References</Text>
              <Text style={{ fontSize: fontSize - 1, color: "#475569", fontStyle: "italic", lineHeight: 1.5 }}>{data.references}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

// ─── PRISM PDF ───────────────────────────────────────────────────────────────
const PrismPDF = ({ data, settings }: { data: ResumeData; settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const S = StyleSheet.create({
    page: { padding: margin, fontFamily: "Helvetica", fontSize: fontSize, color: "#334155", lineHeight },
    header: { flexDirection: "row", borderBottomWidth: 3, borderBottomColor: accentColor, paddingBottom: 12, marginBottom: 16 },
    name: { fontSize: fontSize * 2.2, fontWeight: "bold", color: "#0f172a" },
    titleText: { fontSize: fontSize, color: accentColor, fontWeight: "bold", marginTop: 4 },
    contact: { fontSize: fontSize - 2, color: "#64748b", marginTop: 4 },
    sectionBar: { flexDirection: "row", alignItems: "center", marginBottom: 8, marginTop: 14 },
    sectionLine: { flex: 1, height: 1, backgroundColor: accentColor, marginLeft: 6 },
    sectionLabel: { fontSize: fontSize - 2, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.5, color: accentColor },
    main: { flexDirection: "row", gap: 20 },
    sidebar: { flex: 1 },
    content: { flex: 2 },
    entryTitle: { fontWeight: "bold", fontSize: fontSize, color: "#0f172a" },
    accentText: { fontSize: fontSize - 1, color: accentColor, fontWeight: "bold", marginBottom: 3 },
    dateText: { fontSize: fontSize - 3, color: "#94a3b8", textTransform: "uppercase" },
    bullet: { flexDirection: "row", gap: 4, marginBottom: 2 },
    bulletText: { flex: 1, fontSize: fontSize - 1, color: "#475569" },
  });

  const SectionTitle = ({ title }: { title: string }) => (
    <View style={S.sectionBar}>
      <Text style={S.sectionLabel}>{title}</Text>
      <View style={S.sectionLine} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={S.header}>
          <View style={{ flex: 1 }}>
            <Text style={S.name}>{data.personal.firstName} {data.personal.lastName}</Text>
            {data.personal.title && <Text style={S.titleText}>{data.personal.title}</Text>}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {data.personal.email && <Text style={S.contact}>{data.personal.email}</Text>}
              {data.personal.phone && <Text style={S.contact}>{data.personal.phone}</Text>}
              {data.personal.location && <Text style={S.contact}>{data.personal.location}</Text>}
            </View>
          </View>
        </View>

        <View style={S.main}>
          {/* Sidebar */}
          <View style={S.sidebar}>
            {data.skills.length > 0 && (
              <View>
                <SectionTitle title="Skills" />
                {data.skills.map((g: any) => (
                  <View key={g.id} style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: fontSize - 2, fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", marginBottom: 2 }}>{g.category}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569", lineHeight: 1.5 }}>{g.skills.join(", ")}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.education.length > 0 && (
              <View>
                <SectionTitle title="Education" />
                {data.education.map((edu: any) => (
                  <View key={edu.id} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1, color: "#0f172a" }}>{edu.degree}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{edu.school}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: accentColor, textTransform: "uppercase", fontWeight: "bold" }}>{edu.startYear} – {edu.endYear}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
              <View>
                <SectionTitle title="Certifications" />
                {data.certifications.map((cert: any) => (
                  <View key={cert.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{cert.name}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{cert.issuer} · {cert.date}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
              <View>
                <SectionTitle title="Languages" />
                {data.languages.map((lang: any) => (
                  <View key={lang.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{lang.name}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#94a3b8" }}>{lang.proficiency}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Main */}
          <View style={S.content}>
            {data.sectionVisibility?.summary !== false && data.summary && (
              <View>
                <SectionTitle title="Profile" />
                <Text style={{ fontSize: fontSize - 1, color: "#475569", lineHeight: 1.5 }}>{data.summary}</Text>
              </View>
            )}
            {data.experience.length > 0 && (
              <View>
                <SectionTitle title="Experience" />
                {data.experience.map((exp: any) => (
                  <View key={exp.id} style={{ marginBottom: 12, paddingLeft: 8, borderLeftWidth: 1.5, borderLeftColor: accentColor }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={S.entryTitle}>{exp.role}</Text>
                      <Text style={S.dateText}>{exp.startDate} – {exp.endDate}</Text>
                    </View>
                    <Text style={S.accentText}>{exp.company}</Text>
                    {exp.bullets.map((b: string, i: number) => (
                      <View key={i} style={S.bullet}>
                        <Text style={{ color: "#cbd5e1", fontSize: fontSize - 1 }}>▸</Text>
                        <Text style={S.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
              <View>
                <SectionTitle title="Projects" />
                {data.projects.map((proj: any) => (
                  <View key={proj.id} style={{ marginBottom: 8 }}>
                    <Text style={S.entryTitle}>{proj.name}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569", lineHeight: 1.4 }}>{proj.description}</Text>
                    {proj.techStack?.length > 0 && (
                      <Text style={{ fontSize: fontSize - 3, color: "#94a3b8", marginTop: 2 }}>{proj.techStack.join(" · ")}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
              <View>
                <SectionTitle title="Publications" />
                {data.publications.map((pub: any) => (
                  <View key={pub.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{pub.title}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{pub.publisher} · {pub.date}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
              <View>
                <SectionTitle title="Grants" />
                {data.grants.map((g: any) => (
                  <View key={g.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{g.title}</Text>
                      <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{g.organization}</Text>
                    </View>
                    <Text style={{ fontWeight: "bold", color: accentColor, fontSize: fontSize - 1 }}>{g.amount}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
              <View>
                <SectionTitle title="Teaching" />
                {data.teaching.map((t: any) => (
                  <View key={t.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{t.course}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{t.institution} · {t.date}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
              <View>
                <SectionTitle title="Additional" />
                {data.custom.map((cust: any) => (
                  <View key={cust.id} style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={S.entryTitle}>{cust.title}</Text>
                      <Text style={S.dateText}>{cust.date}</Text>
                    </View>
                    <Text style={S.accentText}>{cust.subtitle}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569" }}>{cust.description}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.references !== false && data.references && (
              <View>
                <SectionTitle title="References" />
                <Text style={{ fontSize: fontSize - 2, color: "#475569", fontStyle: "italic" }}>{data.references}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ─── SCHOLAR PDF ─────────────────────────────────────────────────────────────
const ScholarPDF = ({ data, settings }: { data: ResumeData; settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const S = StyleSheet.create({
    page: { padding: margin, fontFamily: "Times-Roman", fontSize: fontSize, color: "#334155", lineHeight },
    name: { fontSize: fontSize * 2.6, fontWeight: "bold", color: "#0f172a", textAlign: "center" },
    titleText: { fontSize: fontSize + 1, color: accentColor, textAlign: "center", fontStyle: "italic", marginTop: 4 },
    contact: { fontSize: fontSize - 2, color: "#64748b", textAlign: "center", marginTop: 6 },
    divider: { borderBottomWidth: 2, borderBottomColor: "#0f172a", marginVertical: 12 },
    sectionTitle: { fontSize: fontSize - 1, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.5, borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 4, marginBottom: 8, marginTop: 16, flexDirection: "row", alignItems: "center" },
    entryTitle: { fontWeight: "bold", fontSize: fontSize, color: "#0f172a" },
    italic: { fontStyle: "italic", color: accentColor },
    dateText: { fontSize: fontSize - 2, color: "#94a3b8" },
    bullet: { flexDirection: "row", gap: 5, marginBottom: 3 },
    bulletText: { flex: 1, lineHeight: 1.5, fontSize: fontSize - 1 },
  });

  const SectionTitle = ({ title }: { title: string }) => (
    <View style={{ marginTop: 16, marginBottom: 8 }}>
      <Text style={{ fontSize: fontSize - 1, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, color: "#334155" }}>{title}</Text>
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", marginTop: 3 }} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={{ textAlign: "center", marginBottom: 8 }}>
          <Text style={S.name}>{data.personal.firstName} {data.personal.lastName}</Text>
          {data.personal.title && <Text style={S.titleText}>{data.personal.title}</Text>}
          <Text style={S.contact}>
            {[data.personal.email, data.personal.phone, data.personal.location, data.personal.orcid ? `ORCID: ${data.personal.orcid}` : null].filter(Boolean).join("  |  ")}
          </Text>
        </View>
        <View style={S.divider} />

        {data.sectionVisibility?.summary !== false && data.summary && (
          <View>
            <SectionTitle title="Research Interests" />
            <Text style={{ fontStyle: "italic", fontSize: fontSize - 1, color: "#475569", lineHeight: 1.6 }}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View>
            <SectionTitle title="Academic Positions" />
            {data.experience.map((exp: any) => (
              <View key={exp.id} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={S.entryTitle}>{exp.role}</Text>
                  <Text style={S.dateText}>{exp.startDate} – {exp.endDate}</Text>
                </View>
                <Text style={{ fontStyle: "italic", fontSize: fontSize - 1, color: accentColor, marginBottom: 4 }}>{exp.company}</Text>
                {exp.bullets.filter((b: string) => b).map((b: string, i: number) => (
                  <View key={i} style={S.bullet}>
                    <Text style={{ color: "#94a3b8" }}>•</Text>
                    <Text style={S.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View>
            <SectionTitle title="Education" />
            {data.education.map((edu: any) => (
              <View key={edu.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={S.entryTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</Text>
                  <Text style={{ fontStyle: "italic", color: accentColor, fontSize: fontSize - 1 }}>{edu.school}</Text>
                  {edu.thesisTitle && <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>Thesis: {edu.thesisTitle}</Text>}
                  {edu.supervisor && <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>Supervisor: {edu.supervisor}</Text>}
                </View>
                <Text style={S.dateText}>{edu.startYear} – {edu.endYear}</Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
          <View>
            <SectionTitle title="Publications" />
            {data.publications.map((pub: any, i: number) => (
              <View key={pub.id} style={{ flexDirection: "row", gap: 6, marginBottom: 6 }}>
                <Text style={{ fontSize: fontSize - 2, color: "#94a3b8", width: 18 }}>[{i + 1}]</Text>
                <Text style={{ flex: 1, fontSize: fontSize - 1, lineHeight: 1.5 }}>
                  <Text style={{ fontWeight: "bold" }}>{pub.title}. </Text>
                  <Text style={{ fontStyle: "italic", color: accentColor }}>{pub.publisher}</Text>
                  <Text style={{ color: "#64748b" }}>, {pub.date}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
          <View>
            <SectionTitle title="Grants & Funding" />
            {data.grants.map((g: any) => (
              <View key={g.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <View>
                  <Text style={S.entryTitle}>{g.title}</Text>
                  <Text style={{ fontStyle: "italic", fontSize: fontSize - 1, color: accentColor }}>{g.organization}</Text>
                </View>
                <Text style={{ fontWeight: "bold", color: accentColor, fontSize: fontSize }}>{g.amount}</Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
          <View>
            <SectionTitle title="Teaching Experience" />
            {data.teaching.map((t: any) => (
              <View key={t.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <View>
                  <Text style={S.entryTitle}>{t.course}</Text>
                  <Text style={{ fontStyle: "italic", color: accentColor, fontSize: fontSize - 1 }}>{t.institution}</Text>
                  {t.description && <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{t.description}</Text>}
                </View>
                <Text style={S.dateText}>{t.date}</Text>
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View>
            <SectionTitle title="Skills" />
            {data.skills.map((g: any) => (
              <View key={g.id} style={{ flexDirection: "row", gap: 8, marginBottom: 4 }}>
                <Text style={{ fontWeight: "bold", fontSize: fontSize - 1, color: "#334155", minWidth: 100 }}>{g.category}:</Text>
                <Text style={{ flex: 1, fontSize: fontSize - 1, color: "#475569" }}>{g.skills.join(", ")}</Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
          <View>
            <SectionTitle title="Certifications" />
            {data.certifications.map((cert: any) => (
              <View key={cert.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{cert.name}</Text>
                <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{cert.issuer} · {cert.date}</Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
          <View>
            <SectionTitle title="Languages" />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 14 }}>
              {data.languages.map((lang: any) => (
                <Text key={lang.id} style={{ fontSize: fontSize - 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{lang.name}</Text>
                  <Text style={{ color: "#64748b" }}> ({lang.proficiency})</Text>
                </Text>
              ))}
            </View>
          </View>
        )}

        {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
          <View>
            <SectionTitle title="Additional" />
            {data.custom.map((cust: any) => (
              <View key={cust.id} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={S.entryTitle}>{cust.title}</Text>
                  <Text style={S.dateText}>{cust.date}</Text>
                </View>
                <Text style={{ fontStyle: "italic", color: accentColor, fontSize: fontSize - 1, marginBottom: 2 }}>{cust.subtitle}</Text>
                <Text style={{ fontSize: fontSize - 1, color: "#475569", lineHeight: 1.5 }}>{cust.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.sectionVisibility?.references !== false && data.references && (
          <View>
            <SectionTitle title="References" />
            <Text style={{ fontStyle: "italic", fontSize: fontSize - 1, color: "#475569", lineHeight: 1.5 }}>{data.references}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

// ─── COMPACT PDF ─────────────────────────────────────────────────────────────
const CompactPDF = ({ data, settings }: { data: ResumeData; settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const fs = fontSize - 1; // compact = slightly smaller base
  const S = StyleSheet.create({
    page: { padding: margin, fontFamily: "Helvetica", fontSize: fs, color: "#334155", lineHeight: lineHeight * 0.95 },
    header: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10 },
    name: { fontSize: fs * 2, fontWeight: "bold", color: "#0f172a" },
    titleText: { fontSize: fs + 1, color: accentColor, fontWeight: "bold" },
    contact: { fontSize: fs - 2, color: "#64748b", marginTop: 3 },
    divider: { borderBottomWidth: 1.5, borderBottomColor: accentColor, marginBottom: 10 },
    sSection: { fontSize: fs - 2, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, color: "#94a3b8", marginBottom: 4, marginTop: 10 },
    main: { flexDirection: "row", gap: 16 },
    col2: { flex: 2 },
    col1: { flex: 1 },
    entryTitle: { fontWeight: "bold", fontSize: fs, color: "#0f172a" },
    accentSm: { fontSize: fs - 1, color: accentColor, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 },
    dateSm: { fontSize: fs - 2, color: "#94a3b8", textTransform: "uppercase" },
    bullet: { flexDirection: "row", gap: 4, marginBottom: 1 },
    bulletText: { flex: 1, fontSize: fs - 1, color: "#475569", lineHeight: 1.4 },
  });

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Tight Header */}
        <View style={S.header}>
          <View style={{ flex: 1 }}>
            <Text style={S.name}>{data.personal.firstName} {data.personal.lastName}</Text>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              {data.personal.title && <Text style={S.titleText}>{data.personal.title}</Text>}
            </View>
            <Text style={S.contact}>
              {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join("   |   ")}
            </Text>
            {(data.personal.website || data.personal.linkedin || data.personal.github) && (
              <Text style={S.contact}>
                {[data.personal.website, data.personal.linkedin, data.personal.github].filter(Boolean).join("   |   ")}
              </Text>
            )}
          </View>
        </View>
        <View style={S.divider} />

        {data.sectionVisibility?.summary !== false && data.summary && (
          <Text style={{ fontStyle: "italic", fontSize: fs - 1, color: "#475569", marginBottom: 8, lineHeight: 1.4, borderLeftWidth: 1.5, borderLeftColor: accentColor, paddingLeft: 6 }}>{data.summary}</Text>
        )}

        <View style={S.main}>
          {/* Main col */}
          <View style={S.col2}>
            {data.experience.length > 0 && (
              <View>
                <Text style={S.sSection}>Experience</Text>
                {data.experience.map((exp: any) => (
                  <View key={exp.id} style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={S.entryTitle}>{exp.role}</Text>
                      <Text style={S.dateSm}>{exp.startDate}–{exp.endDate}</Text>
                    </View>
                    <Text style={S.accentSm}>{exp.company}</Text>
                    {exp.bullets.filter((b: string) => b).map((b: string, i: number) => (
                      <View key={i} style={S.bullet}>
                        <Text style={{ color: "#cbd5e1", fontSize: fs - 1 }}>•</Text>
                        <Text style={S.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
              <View>
                <Text style={S.sSection}>Projects</Text>
                {data.projects.map((proj: any) => (
                  <View key={proj.id} style={{ marginBottom: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={S.entryTitle}>{proj.name}</Text>
                      {proj.techStack?.length > 0 && <Text style={{ fontSize: fs - 2, color: "#94a3b8" }}>{proj.techStack.slice(0, 3).join(", ")}</Text>}
                    </View>
                    <Text style={{ fontSize: fs - 1, color: "#475569", lineHeight: 1.3 }}>{proj.description}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
              <View>
                <Text style={S.sSection}>Publications</Text>
                {data.publications.map((pub: any, i: number) => (
                  <Text key={pub.id} style={{ fontSize: fs - 1, lineHeight: 1.4, marginBottom: 3 }}>
                    <Text style={{ color: "#94a3b8" }}>[{i + 1}] </Text>
                    <Text style={{ fontWeight: "bold" }}>{pub.title}</Text>
                    <Text style={{ color: "#64748b" }}> · {pub.publisher}, {pub.date}</Text>
                  </Text>
                ))}
              </View>
            )}
            {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
              <View>
                <Text style={S.sSection}>Additional</Text>
                {data.custom.map((cust: any) => (
                  <View key={cust.id} style={{ marginBottom: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={S.entryTitle}>{cust.title}</Text>
                      <Text style={S.dateSm}>{cust.date}</Text>
                    </View>
                    <Text style={S.accentSm}>{cust.subtitle}</Text>
                    <Text style={{ fontSize: fs - 1, color: "#475569" }}>{cust.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Sidebar col */}
          <View style={S.col1}>
            {data.skills.length > 0 && (
              <View>
                <Text style={S.sSection}>Skills</Text>
                {data.skills.map((g: any) => (
                  <View key={g.id} style={{ marginBottom: 5 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fs - 2, textTransform: "uppercase", color: "#94a3b8", letterSpacing: 1 }}>{g.category}</Text>
                    <Text style={{ fontSize: fs - 1, color: "#475569", lineHeight: 1.4 }}>{g.skills.join(", ")}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.education.length > 0 && (
              <View>
                <Text style={S.sSection}>Education</Text>
                {data.education.map((edu: any) => (
                  <View key={edu.id} style={{ marginBottom: 5 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fs - 1 }}>{edu.degree}</Text>
                    <Text style={{ fontSize: fs - 2, color: "#64748b" }}>{edu.school}</Text>
                    <Text style={{ fontSize: fs - 3, color: accentColor, fontWeight: "bold", textTransform: "uppercase" }}>{edu.startYear}–{edu.endYear}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
              <View>
                <Text style={S.sSection}>Certifications</Text>
                {data.certifications.map((cert: any) => (
                  <View key={cert.id} style={{ marginBottom: 4 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fs - 1 }}>{cert.name}</Text>
                    <Text style={{ fontSize: fs - 2, color: "#94a3b8" }}>{cert.issuer} · {cert.date}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
              <View>
                <Text style={S.sSection}>Languages</Text>
                {data.languages.map((lang: any) => (
                  <View key={lang.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fs - 1 }}>{lang.name}</Text>
                    <Text style={{ fontSize: fs - 2, color: "#94a3b8" }}>{lang.proficiency}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
              <View>
                <Text style={S.sSection}>Grants</Text>
                {data.grants.map((g: any) => (
                  <View key={g.id} style={{ marginBottom: 4 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fs - 1 }}>{g.title}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ fontSize: fs - 2, color: "#64748b" }}>{g.organization}</Text>
                      <Text style={{ fontWeight: "bold", color: accentColor, fontSize: fs - 2 }}>{g.amount}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.references !== false && data.references && (
              <View>
                <Text style={S.sSection}>References</Text>
                <Text style={{ fontStyle: "italic", fontSize: fs - 2, color: "#64748b" }}>{data.references}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ─── CASCADE PDF ──────────────────────────────────────────────────────────────
const CascadePDF = ({ data, settings }: { data: ResumeData; settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const S = StyleSheet.create({
    page: { padding: margin, fontFamily: "Helvetica", fontSize: fontSize, color: "#334155", lineHeight },
    header: { borderBottomWidth: 2, borderBottomColor: accentColor, paddingBottom: 12, marginBottom: 14 },
    name: { fontSize: fontSize * 2.8, fontWeight: "bold", color: "#0f172a" },
    accentName: { color: accentColor },
    title: { fontSize: fontSize, color: "#64748b", fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 4 },
    contact: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
    contactItem: { fontSize: fontSize - 2, color: "#64748b" },
    main: { flexDirection: "row", gap: 20 },
    col2: { flex: 2 },
    col1: { width: 120 },
    secLabel: { fontSize: fontSize - 3, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, color: "#94a3b8", marginBottom: 6, marginTop: 12 },
    entryTitle: { fontWeight: "bold", fontSize: fontSize, color: "#0f172a" },
    accentSmall: { fontSize: fontSize - 2, color: accentColor, fontWeight: "bold" },
    dateBadge: { fontSize: fontSize - 3, color: "#64748b", fontWeight: "bold" },
    bullet: { flexDirection: "row", gap: 4, marginBottom: 2 },
    bulletText: { flex: 1, fontSize: fontSize - 1, color: "#475569", lineHeight: 1.4 },
  });

  const SecLabel = ({ t }: { t: string }) => <Text style={S.secLabel}>{t.toUpperCase()}</Text>;

  return (
    <Document>
      <Page size="A4" style={S.page}>
        <View style={S.header}>
          <Text style={[S.name]}>{data.personal.firstName} <Text style={{ color: accentColor }}>{data.personal.lastName}</Text></Text>
          {data.personal.title && <Text style={S.title}>{data.personal.title}</Text>}
          <View style={S.contact}>
            {data.personal.email && <Text style={S.contactItem}>{data.personal.email}</Text>}
            {data.personal.phone && <Text style={S.contactItem}>{data.personal.phone}</Text>}
            {data.personal.location && <Text style={S.contactItem}>{data.personal.location}</Text>}
            {data.personal.website && <Text style={S.contactItem}>{data.personal.website}</Text>}
            {data.personal.linkedin && <Text style={S.contactItem}>{data.personal.linkedin}</Text>}
          </View>
        </View>

        <View style={S.main}>
          <View style={S.col2}>
            {data.sectionVisibility?.summary !== false && data.summary && (
              <View>
                <SecLabel t="Profile" />
                <Text style={{ fontSize: fontSize - 1, color: "#475569", lineHeight: 1.5, borderLeftWidth: 2, borderLeftColor: accentColor, paddingLeft: 6 }}>{data.summary}</Text>
              </View>
            )}
            {data.experience.length > 0 && (
              <View>
                <SecLabel t="Experience" />
                {data.experience.map((exp: any) => (
                  <View key={exp.id} style={{ marginBottom: 10, paddingLeft: 8, borderLeftWidth: 1, borderLeftColor: `${accentColor}40` }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={S.entryTitle}>{exp.role}</Text>
                      <Text style={S.dateBadge}>{exp.startDate} – {exp.endDate}</Text>
                    </View>
                    <Text style={S.accentSmall}>{exp.company}</Text>
                    {exp.bullets.filter((b: string) => b).map((b: string, i: number) => (
                      <View key={i} style={S.bullet}>
                        <Text style={{ color: accentColor, fontSize: fontSize - 1 }}>›</Text>
                        <Text style={S.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
              <View>
                <SecLabel t="Projects" />
                {data.projects.map((proj: any) => (
                  <View key={proj.id} style={{ marginBottom: 6, padding: 5, backgroundColor: "#f8fafc", borderRadius: 3 }}>
                    <Text style={S.entryTitle}>{proj.name}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569", lineHeight: 1.4 }}>{proj.description}</Text>
                    {proj.techStack?.length > 0 && <Text style={{ fontSize: fontSize - 3, color: "#94a3b8", marginTop: 2 }}>{proj.techStack.join(" · ")}</Text>}
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
              <View>
                <SecLabel t="Publications" />
                {data.publications.map((pub: any, i: number) => (
                  <Text key={pub.id} style={{ fontSize: fontSize - 1, lineHeight: 1.4, marginBottom: 4 }}>
                    <Text style={{ color: "#94a3b8" }}>[{i + 1}] </Text>
                    <Text style={{ fontWeight: "bold" }}>{pub.title}.</Text>
                    <Text style={{ color: "#64748b" }}> {pub.publisher}, {pub.date}</Text>
                  </Text>
                ))}
              </View>
            )}
            {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
              <View>
                <SecLabel t="Grants" />
                {data.grants.map((g: any) => (
                  <View key={g.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{g.title}</Text>
                      <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{g.organization}</Text>
                    </View>
                    <Text style={{ fontWeight: "bold", color: accentColor }}>{g.amount}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
              <View>
                <SecLabel t="Additional" />
                {data.custom.map((c: any) => (
                  <View key={c.id} style={{ marginBottom: 6 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={S.entryTitle}>{c.title}</Text>
                      <Text style={S.dateBadge}>{c.date}</Text>
                    </View>
                    <Text style={S.accentSmall}>{c.subtitle}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569" }}>{c.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={S.col1}>
            {data.skills.length > 0 && (
              <View>
                <SecLabel t="Skills" />
                {data.skills.map((g: any) => (
                  <View key={g.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: fontSize - 2, fontWeight: "bold", color: accentColor, textTransform: "uppercase", marginBottom: 2 }}>{g.category}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569", lineHeight: 1.4 }}>{g.skills.join(", ")}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.education.length > 0 && (
              <View>
                <SecLabel t="Education" />
                {data.education.map((edu: any) => (
                  <View key={edu.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{edu.degree}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: accentColor, fontWeight: "bold" }}>{edu.school}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: "#94a3b8" }}>{edu.startYear} – {edu.endYear}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
              <View>
                <SecLabel t="Certifications" />
                {data.certifications.map((cert: any) => (
                  <View key={cert.id} style={{ marginBottom: 4 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{cert.name}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#94a3b8" }}>{cert.issuer} · {cert.date}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
              <View>
                <SecLabel t="Languages" />
                {data.languages.map((lang: any) => (
                  <View key={lang.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{lang.name}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#94a3b8" }}>{lang.proficiency}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.references !== false && data.references && (
              <View>
                <SecLabel t="References" />
                <Text style={{ fontSize: fontSize - 2, color: "#64748b", fontStyle: "italic" }}>{data.references}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ─── MINIMO PDF ───────────────────────────────────────────────────────────────
const MinimoPDF = ({ data, settings }: { data: ResumeData; settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const S = StyleSheet.create({
    page: { padding: margin * 1.5, fontFamily: "Helvetica", fontSize: fontSize, color: "#334155", lineHeight },
    name: { fontSize: fontSize * 3, fontWeight: "bold", color: "#0f172a", letterSpacing: -1 },
    title: { fontSize: fontSize - 1, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 3, marginTop: 4 },
    accent: { width: 40, height: 2, backgroundColor: accentColor, marginVertical: 10 },
    contact: { fontSize: fontSize - 2, color: "#94a3b8", lineHeight: 1.6 },
    secLabel: { fontSize: fontSize - 3, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 3, color: "#cbd5e1", marginBottom: 12, marginTop: 20 },
    row: { flexDirection: "row", gap: 40, marginBottom: 14 },
    rowLabel: { width: 80, textAlign: "right", fontSize: fontSize - 2, color: "#94a3b8", fontWeight: "bold" },
    rowContent: { flex: 1 },
    entryHead: { fontWeight: "bold", fontSize: fontSize, color: "#0f172a" },
    bullet: { fontSize: fontSize - 1, color: "#64748b", lineHeight: 1.5, marginTop: 2 },
  });

  return (
    <Document>
      <Page size="A4" style={S.page}>
        <Text style={S.name}>{data.personal.firstName} {data.personal.lastName}</Text>
        {data.personal.title && <Text style={S.title}>{data.personal.title}</Text>}
        <View style={S.accent} />
        <Text style={S.contact}>
          {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join("   ·   ")}
        </Text>

        {data.sectionVisibility?.summary !== false && data.summary && (
          <View>
            <Text style={S.secLabel}>Profile</Text>
            <Text style={{ fontSize: fontSize - 1, color: "#64748b", lineHeight: 1.6, fontStyle: "italic" }}>{data.summary}</Text>
          </View>
        )}
        {data.experience.length > 0 && (
          <View>
            <Text style={S.secLabel}>Experience</Text>
            {data.experience.map((exp: any) => (
              <View key={exp.id} style={S.row}>
                <View style={S.rowLabel}>
                  <Text style={{ fontSize: fontSize - 3, color: "#94a3b8" }}>{exp.startDate}{"\n"}–{"\n"}{exp.endDate}</Text>
                  <Text style={{ fontSize: fontSize - 3, color: accentColor, fontWeight: "bold", marginTop: 4 }}>{exp.company}</Text>
                </View>
                <View style={S.rowContent}>
                  <Text style={S.entryHead}>{exp.role}</Text>
                  {exp.bullets.filter((b: string) => b).map((b: string, i: number) => (
                    <Text key={i} style={S.bullet}>{b}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
        {data.education.length > 0 && (
          <View>
            <Text style={S.secLabel}>Education</Text>
            {data.education.map((edu: any) => (
              <View key={edu.id} style={S.row}>
                <View style={S.rowLabel}>
                  <Text style={{ fontSize: fontSize - 3, color: "#94a3b8" }}>{edu.startYear} – {edu.endYear}</Text>
                  <Text style={{ fontSize: fontSize - 3, color: accentColor, fontWeight: "bold", marginTop: 4 }}>{edu.school}</Text>
                </View>
                <View style={S.rowContent}>
                  <Text style={S.entryHead}>{edu.degree}{edu.field ? ` — ${edu.field}` : ""}</Text>
                  {edu.thesisTitle && <Text style={{ fontSize: fontSize - 2, color: "#94a3b8", fontStyle: "italic", marginTop: 2 }}>{edu.thesisTitle}</Text>}
                </View>
              </View>
            ))}
          </View>
        )}
        {data.skills.length > 0 && (
          <View>
            <Text style={S.secLabel}>Expertise</Text>
            {data.skills.map((g: any) => (
              <View key={g.id} style={S.row}>
                <Text style={S.rowLabel}>{g.category}</Text>
                <Text style={{ ...S.rowContent, fontSize: fontSize - 1, color: "#475569" }}>{g.skills.join("  ·  ")}</Text>
              </View>
            ))}
          </View>
        )}
        {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
          <View>
            <Text style={S.secLabel}>Publications</Text>
            {data.publications.map((pub: any, i: number) => (
              <View key={pub.id} style={S.row}>
                <Text style={S.rowLabel}>{pub.date}</Text>
                <Text style={{ ...S.rowContent, fontSize: fontSize - 1, color: "#64748b", lineHeight: 1.5 }}>
                  <Text style={{ fontWeight: "bold", color: "#334155" }}>{pub.title}.</Text> {pub.publisher}
                </Text>
              </View>
            ))}
          </View>
        )}
        {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
          <View>
            <Text style={S.secLabel}>Languages</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
              {data.languages.map((lang: any) => (
                <Text key={lang.id} style={{ fontSize: fontSize - 1, color: "#475569" }}>
                  <Text style={{ fontWeight: "bold" }}>{lang.name}</Text> · {lang.proficiency}
                </Text>
              ))}
            </View>
          </View>
        )}
        {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
          <View>
            <Text style={S.secLabel}>Certifications</Text>
            {data.certifications.map((cert: any) => (
              <View key={cert.id} style={S.row}>
                <Text style={S.rowLabel}>{cert.date}</Text>
                <Text style={{ ...S.rowContent, fontSize: fontSize - 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{cert.name}</Text> · {cert.issuer}
                </Text>
              </View>
            ))}
          </View>
        )}
        {data.sectionVisibility?.references !== false && data.references && (
          <View>
            <Text style={S.secLabel}>References</Text>
            <Text style={{ fontSize: fontSize - 1, color: "#94a3b8", fontStyle: "italic" }}>{data.references}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

// ─── ARYA PDF ─────────────────────────────────────────────────────────────────
const AryaPDF = ({ data, settings }: { data: ResumeData; settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const S = StyleSheet.create({
    page: { padding: 0, fontFamily: "Helvetica", fontSize: fontSize, color: "#334155", lineHeight, flexDirection: "row" },
    sidebar: { width: 160, backgroundColor: accentColor, padding: margin, color: "#ffffff" },
    main: { flex: 1, padding: margin },
    sidebarName: { fontSize: fontSize * 1.5, fontWeight: "bold", color: "#ffffff", lineHeight: 1.2, marginBottom: 4 },
    sidebarTitle: { fontSize: fontSize - 2, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: 1.5 },
    sidebarLabel: { fontSize: fontSize - 3, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.40)", marginTop: 14, marginBottom: 5 },
    sidebarContactItem: { fontSize: fontSize - 2, color: "rgba(255,255,255,0.70)", marginBottom: 3, lineHeight: 1.4 },
    sidebarSkillCat: { fontSize: fontSize - 3, fontWeight: "bold", color: "rgba(255,255,255,0.40)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 },
    sidebarSkills: { fontSize: fontSize - 2, color: "rgba(255,255,255,0.80)", lineHeight: 1.5 },
    sidebarLang: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    mainLabel: { fontSize: fontSize - 3, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, color: "#94a3b8", marginBottom: 6, marginTop: 14 },
    entryTitle: { fontWeight: "bold", fontSize: fontSize, color: "#0f172a" },
    accentText: { fontSize: fontSize - 2, color: accentColor, fontWeight: "bold" },
    dateText: { fontSize: fontSize - 3, color: "#94a3b8" },
    bullet: { flexDirection: "row", gap: 5, marginBottom: 2 },
    dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: accentColor, marginTop: 4, flexShrink: 0 },
    bulletText: { flex: 1, fontSize: fontSize - 1, color: "#475569", lineHeight: 1.4 },
  });

  const MainLabel = ({ t }: { t: string }) => <Text style={S.mainLabel}>{t.toUpperCase()}</Text>;
  const SideLabel = ({ t }: { t: string }) => <Text style={S.sidebarLabel}>{t.toUpperCase()}</Text>;

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Sidebar */}
        <View style={S.sidebar}>
          <Text style={S.sidebarName}>{data.personal.firstName}{"\n"}{data.personal.lastName}</Text>
          {data.personal.title && <Text style={S.sidebarTitle}>{data.personal.title}</Text>}
          <SideLabel t="Contact" />
          {data.personal.email && <Text style={S.sidebarContactItem}>{data.personal.email}</Text>}
          {data.personal.phone && <Text style={S.sidebarContactItem}>{data.personal.phone}</Text>}
          {data.personal.location && <Text style={S.sidebarContactItem}>{data.personal.location}</Text>}
          {data.personal.website && <Text style={S.sidebarContactItem}>{data.personal.website}</Text>}
          {data.personal.linkedin && <Text style={S.sidebarContactItem}>{data.personal.linkedin}</Text>}
          {data.skills.length > 0 && (
            <View>
              <SideLabel t="Skills" />
              {data.skills.map((g: any) => (
                <View key={g.id} style={{ marginBottom: 6 }}>
                  <Text style={S.sidebarSkillCat}>{g.category}</Text>
                  <Text style={S.sidebarSkills}>{g.skills.join(", ")}</Text>
                </View>
              ))}
            </View>
          )}
          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <View>
              <SideLabel t="Languages" />
              {data.languages.map((lang: any) => (
                <View key={lang.id} style={S.sidebarLang}>
                  <Text style={{ fontWeight: "bold", fontSize: fontSize - 2, color: "#fff" }}>{lang.name}</Text>
                  <Text style={{ fontSize: fontSize - 3, color: "rgba(255,255,255,0.50)" }}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>
          )}
          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <View>
              <SideLabel t="Certifications" />
              {data.certifications.map((cert: any) => (
                <View key={cert.id} style={{ marginBottom: 5 }}>
                  <Text style={{ fontWeight: "bold", fontSize: fontSize - 2, color: "#fff" }}>{cert.name}</Text>
                  <Text style={{ fontSize: fontSize - 3, color: "rgba(255,255,255,0.50)" }}>{cert.issuer} · {cert.date}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main */}
        <View style={S.main}>
          {data.summary && <Text style={{ fontSize: fontSize - 1, color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>{data.summary}</Text>}
          {data.experience.length > 0 && (
            <View>
              <MainLabel t="Experience" />
              {data.experience.map((exp: any) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={S.entryTitle}>{exp.role}</Text>
                    <Text style={S.dateText}>{exp.startDate} – {exp.endDate}</Text>
                  </View>
                  <Text style={S.accentText}>{exp.company}</Text>
                  {exp.bullets.filter((b: string) => b).map((b: string, i: number) => (
                    <View key={i} style={S.bullet}>
                      <View style={S.dot} />
                      <Text style={S.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
          {data.education.length > 0 && (
            <View>
              <MainLabel t="Education" />
              {data.education.map((edu: any) => (
                <View key={edu.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 7 }}>
                  <View>
                    <Text style={S.entryTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</Text>
                    <Text style={S.accentText}>{edu.school}</Text>
                  </View>
                  <Text style={S.dateText}>{edu.startYear} – {edu.endYear}</Text>
                </View>
              ))}
            </View>
          )}
          {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
            <View>
              <MainLabel t="Projects" />
              {data.projects.map((proj: any) => (
                <View key={proj.id} style={{ marginBottom: 6 }}>
                  <Text style={S.entryTitle}>{proj.name}</Text>
                  <Text style={{ fontSize: fontSize - 2, color: "#475569", lineHeight: 1.4 }}>{proj.description}</Text>
                  {proj.techStack?.length > 0 && <Text style={{ fontSize: fontSize - 3, color: "#94a3b8", marginTop: 1 }}>{proj.techStack.join(" · ")}</Text>}
                </View>
              ))}
            </View>
          )}
          {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
            <View>
              <MainLabel t="Publications" />
              {data.publications.map((pub: any, i: number) => (
                <Text key={pub.id} style={{ fontSize: fontSize - 1, lineHeight: 1.4, marginBottom: 4 }}>
                  <Text style={{ color: "#94a3b8" }}>[{i + 1}] </Text>
                  <Text style={{ fontWeight: "bold" }}>{pub.title}.</Text>
                  <Text style={{ color: "#64748b" }}> {pub.publisher}, {pub.date}</Text>
                </Text>
              ))}
            </View>
          )}
          {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
            <View>
              <MainLabel t="Grants & Funding" />
              {data.grants.map((g: any) => (
                <View key={g.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{g.title}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{g.organization}</Text>
                  </View>
                  <Text style={{ fontWeight: "bold", color: accentColor }}>{g.amount}</Text>
                </View>
              ))}
            </View>
          )}
          {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
            <View>
              <MainLabel t="Additional" />
              {data.custom.map((c: any) => (
                <View key={c.id} style={{ marginBottom: 6 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={S.entryTitle}>{c.title}</Text>
                    <Text style={S.dateText}>{c.date}</Text>
                  </View>
                  <Text style={S.accentText}>{c.subtitle}</Text>
                  <Text style={{ fontSize: fontSize - 2, color: "#475569" }}>{c.description}</Text>
                </View>
              ))}
            </View>
          )}
          {data.sectionVisibility?.references !== false && data.references && (
            <View>
              <MainLabel t="References" />
              <Text style={{ fontSize: fontSize - 2, color: "#64748b", fontStyle: "italic" }}>{data.references}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

// ─── EXECUTIVE PDF ────────────────────────────────────────────────────────────
const ExecutivePDF = ({ data, settings }: { data: ResumeData; settings: any }) => {
  const { accentColor, fontSize, lineHeight, margin } = settings;
  const S = StyleSheet.create({
    page: { padding: 0, fontFamily: "Helvetica", fontSize: fontSize, color: "#334155", lineHeight },
    headerBand: { backgroundColor: "#0f172a", padding: margin, paddingTop: margin + 4 },
    accentStripe: { position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: accentColor },
    name: { fontSize: fontSize * 2.6, color: "#ffffff", fontWeight: "bold", letterSpacing: -0.5 },
    headerTitle: { fontSize: fontSize - 1, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: 3, marginTop: 3 },
    headerDivider: { width: 40, height: 2, backgroundColor: accentColor, marginVertical: 8 },
    headerContact: { fontSize: fontSize - 2, color: "rgba(255,255,255,0.45)", marginRight: 16 },
    body: { flexDirection: "row", padding: margin },
    mainCol: { flex: 2, paddingRight: 20 },
    sideCol: { width: 160, borderLeftWidth: 1, borderLeftColor: "#f1f5f9", paddingLeft: 16 },
    sectionBar: { flexDirection: "row", alignItems: "center", marginBottom: 8, marginTop: 14 },
    sectionDash: { width: 3, height: 16, backgroundColor: accentColor, marginRight: 8 },
    sectionLabel: { fontSize: fontSize - 3, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, color: "#334155" },
    sideLabel: { fontSize: fontSize - 3, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2, color: "#94a3b8", marginTop: 14, marginBottom: 6 },
    entryTitle: { fontWeight: "bold", fontSize: fontSize, color: "#0f172a" },
    accentBold: { fontSize: fontSize - 2, color: accentColor, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 },
    dateSmall: { fontSize: fontSize - 3, color: "#94a3b8", textTransform: "uppercase" },
    bullet: { flexDirection: "row", gap: 5, marginBottom: 2.5 },
    diamond: { fontSize: fontSize - 3, color: "#cbd5e1", marginTop: 1.5 },
    bulletText: { flex: 1, fontSize: fontSize - 1, color: "#475569", lineHeight: 1.4 },
  });

  const SectionHead = ({ t }: { t: string }) => (
    <View style={S.sectionBar}>
      <View style={S.sectionDash} />
      <Text style={S.sectionLabel}>{t.toUpperCase()}</Text>
      <View style={{ flex: 1, height: 0.5, backgroundColor: "#e2e8f0", marginLeft: 8 }} />
    </View>
  );
  const SideHead = ({ t }: { t: string }) => <Text style={S.sideLabel}>{t.toUpperCase()}</Text>;

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Header band */}
        <View style={S.headerBand}>
          <View style={S.accentStripe} />
          <Text style={S.name}>{data.personal.firstName} {data.personal.lastName}</Text>
          {data.personal.title && <Text style={S.headerTitle}>{data.personal.title}</Text>}
          <View style={S.headerDivider} />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {data.personal.email && <Text style={S.headerContact}>{data.personal.email}</Text>}
            {data.personal.phone && <Text style={S.headerContact}>{data.personal.phone}</Text>}
            {data.personal.location && <Text style={S.headerContact}>{data.personal.location}</Text>}
            {data.personal.website && <Text style={S.headerContact}>{data.personal.website}</Text>}
            {data.personal.linkedin && <Text style={S.headerContact}>{data.personal.linkedin}</Text>}
          </View>
        </View>

        <View style={S.body}>
          <View style={S.mainCol}>
            {data.sectionVisibility?.summary !== false && data.summary && (
              <View>
                <Text style={{ fontSize: fontSize - 1, color: "#475569", lineHeight: 1.6, borderLeftWidth: 2, borderLeftColor: accentColor, paddingLeft: 8, marginBottom: 4, fontStyle: "italic" }}>{data.summary}</Text>
              </View>
            )}
            {data.experience.length > 0 && (
              <View>
                <SectionHead t="Professional Experience" />
                {data.experience.map((exp: any) => (
                  <View key={exp.id} style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={S.entryTitle}>{exp.role}</Text>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text style={S.dateSmall}>{exp.startDate} – {exp.endDate}</Text>
                        {exp.location && <Text style={{ fontSize: fontSize - 3, color: "#94a3b8" }}>{exp.location}</Text>}
                      </View>
                    </View>
                    <Text style={S.accentBold}>{exp.company}</Text>
                    {exp.bullets.filter((b: string) => b).map((b: string, i: number) => (
                      <View key={i} style={S.bullet}>
                        <Text style={S.diamond}>◆</Text>
                        <Text style={S.bulletText}>{b}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
              <View>
                <SectionHead t="Key Projects" />
                {data.projects.map((proj: any) => (
                  <View key={proj.id} style={{ borderLeftWidth: 1.5, borderLeftColor: `${accentColor}40`, paddingLeft: 8, marginBottom: 7 }}>
                    <Text style={S.entryTitle}>{proj.name}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569", lineHeight: 1.4 }}>{proj.description}</Text>
                    {proj.techStack?.length > 0 && <Text style={{ fontSize: fontSize - 3, color: "#94a3b8", marginTop: 2 }}>{proj.techStack.join(" · ")}</Text>}
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
              <View>
                <SectionHead t="Publications" />
                {data.publications.map((pub: any, i: number) => (
                  <View key={pub.id} style={{ flexDirection: "row", gap: 6, marginBottom: 5 }}>
                    <Text style={{ fontSize: fontSize - 2, color: "#94a3b8", width: 16 }}>{i + 1}.</Text>
                    <Text style={{ flex: 1, fontSize: fontSize - 1, lineHeight: 1.4 }}>
                      <Text style={{ fontWeight: "bold" }}>{pub.title}. </Text>
                      <Text style={{ fontStyle: "italic", color: "#64748b" }}>{pub.publisher}</Text>
                      <Text style={{ color: "#94a3b8" }}>, {pub.date}</Text>
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
              <View>
                <SectionHead t="Grants & Funding" />
                {data.grants.map((g: any) => (
                  <View key={g.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{g.title}</Text>
                      <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{g.organization}</Text>
                    </View>
                    <Text style={{ fontWeight: "bold", color: accentColor, fontSize: fontSize }}>{g.amount}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
              <View>
                <SectionHead t="Teaching Experience" />
                {data.teaching.map((t: any) => (
                  <View key={t.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{t.course}</Text>
                      <Text style={{ color: accentColor, fontSize: fontSize - 2 }}>{t.institution}</Text>
                    </View>
                    <Text style={S.dateSmall}>{t.date}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
              <View>
                <SectionHead t="Additional" />
                {data.custom.map((c: any) => (
                  <View key={c.id} style={{ marginBottom: 6 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={S.entryTitle}>{c.title}</Text>
                      <Text style={S.dateSmall}>{c.date}</Text>
                    </View>
                    <Text style={S.accentBold}>{c.subtitle}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569" }}>{c.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={S.sideCol}>
            {data.skills.length > 0 && (
              <View>
                <SideHead t="Core Competencies" />
                {data.skills.map((g: any) => (
                  <View key={g.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: fontSize - 3, color: accentColor, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{g.category}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#475569", lineHeight: 1.5 }}>{g.skills.join(", ")}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.education.length > 0 && (
              <View>
                <SideHead t="Education" />
                {data.education.map((edu: any) => (
                  <View key={edu.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1, color: "#0f172a", lineHeight: 1.2 }}>{edu.degree}</Text>
                    {edu.field && <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{edu.field}</Text>}
                    <Text style={{ color: accentColor, fontWeight: "bold", fontSize: fontSize - 2, marginTop: 1 }}>{edu.school}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: "#94a3b8" }}>{edu.startYear} – {edu.endYear}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
              <View>
                <SideHead t="Certifications" />
                {data.certifications.map((cert: any) => (
                  <View key={cert.id} style={{ marginBottom: 5 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{cert.name}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#64748b" }}>{cert.issuer}</Text>
                    <Text style={{ fontSize: fontSize - 3, color: accentColor, fontWeight: "bold", textTransform: "uppercase" }}>{cert.date}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
              <View>
                <SideHead t="Languages" />
                {data.languages.map((lang: any) => (
                  <View key={lang.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>{lang.name}</Text>
                    <Text style={{ fontSize: fontSize - 2, color: "#94a3b8" }}>{lang.proficiency}</Text>
                  </View>
                ))}
              </View>
            )}
            {data.sectionVisibility?.references !== false && data.references && (
              <View>
                <SideHead t="References" />
                <Text style={{ fontSize: fontSize - 2, color: "#94a3b8", fontStyle: "italic", lineHeight: 1.4 }}>{data.references}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
