import Link from "next/link";

export default function Slideshow({ file }) {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "0",
    paddingBottom: "56.25%",
  };

  const iframeStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  };

  const pdfLink = `/slides/index.html?set=${file}&print-pdf`;
  const pdfDownloadLink = `${pdfLink}&_e=download`;

  return (
    <div>
      <div style={containerStyle}>
        <iframe
          src={`/slides/index.html?set=${file}`}
          style={iframeStyle}
        ></iframe>
      </div>
      <Link href={pdfLink} target="_blank">
          View as PDF
        </Link>
    </div>
  );
}