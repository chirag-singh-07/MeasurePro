import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed, but standard ones are fine for now

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  projectInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoBlock: {
    flex: 1,
  },
  label: {
    fontSize: 8,
    textTransform: "uppercase",
    color: "#666",
    fontWeight: "bold",
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: 1,
    borderBottomColor: "#000",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  table: {
    width: "auto",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#EEE",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: "#000",
    color: "#FFF",
    fontWeight: "bold",
  },
  colNo: { width: "5%", textAlign: "center" },
  colDesc: { width: "40%", paddingLeft: 5 },
  colUnit: { width: "10%", textAlign: "center" },
  colSize: { width: "10%", textAlign: "right" },
  colQty: { width: "10%", textAlign: "right" },
  colRate: { width: "10%", textAlign: "right" },
  colAmount: { width: "15%", textAlign: "right", paddingRight: 5 },
  
  footer: {
    marginTop: 30,
    borderTop: 2,
    borderTopColor: "#000",
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 3,
  },
  totalLabel: {
    width: "150pt",
    textAlign: "right",
    paddingRight: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  totalValue: {
    width: "100pt",
    textAlign: "right",
    fontWeight: "black",
  },
  grandTotal: {
    backgroundColor: "#FFDE59",
    paddingVertical: 8,
    marginTop: 5,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

interface Item {
  description: string;
  uom: string;
  size: number;
  qty: number;
  rate: number;
  amount: number;
}

interface Section {
  title: string;
  items: Item[];
  totalAmount: number;
}

interface Project {
  name: string;
  clientName: string;
  date: string;
  location: string;
  gstPercentage: number;
}

interface ProjectPDFProps {
  project: Project;
  sections: Section[];
  billDate?: string;
}

export const ProjectPDF = ({ project, sections, billDate }: ProjectPDFProps) => {
  const subtotal = sections.reduce((sum, s) => sum + s.totalAmount, 0);
  const gstAmount = (subtotal * project.gstPercentage) / 100;
  const total = subtotal + gstAmount;

  const displayDate = billDate || project.date;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{project.name}</Text>
          <Text style={{ fontSize: 10, color: "#666" }}>Measurement Sheet / Estimate</Text>
        </View>

        {/* Project Info */}
        <View style={styles.projectInfo}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Client Name</Text>
            <Text style={styles.value}>{project.clientName}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{project.location || "N/A"}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>
              {new Date(displayDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>

        {/* Sections */}
        {sections.map((section, sIdx) => (
          <View key={sIdx} style={styles.section} wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {sIdx + 1}. {section.title}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                ₹{section.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </Text>
            </View>

            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.colNo}>#</Text>
                <Text style={styles.colDesc}>Description</Text>
                <Text style={styles.colUnit}>Unit</Text>
                <Text style={styles.colSize}>Size</Text>
                <Text style={styles.colQty}>Qty</Text>
                <Text style={styles.colRate}>Rate</Text>
                <Text style={styles.colAmount}>Amount</Text>
              </View>

              {/* Table Rows */}
              {section.items.map((item, iIdx) => (
                <View key={iIdx} style={styles.tableRow}>
                  <Text style={styles.colNo}>{iIdx + 1}</Text>
                  <Text style={styles.colDesc}>{item.description}</Text>
                  <Text style={styles.colUnit}>{item.uom}</Text>
                  <Text style={styles.colSize}>{item.size.toFixed(2)}</Text>
                  <Text style={styles.colQty}>{item.qty.toFixed(2)}</Text>
                  <Text style={styles.colRate}>{item.rate.toFixed(2)}</Text>
                  <Text style={styles.colAmount}>
                    {item.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Summary Footer */}
        <View style={styles.footer} wrap={false}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>
              ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>GST ({project.gstPercentage}%):</Text>
            <Text style={styles.totalValue}>
              ₹{gstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.totalLabel}>Grand Total:</Text>
            <Text style={styles.totalValue}>
              ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};
