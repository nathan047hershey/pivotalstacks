import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileCode, FileText, FileJson, Layout, CheckCircle, Loader, Home, Info, FolderOpen } from 'lucide-react';

const exportOptions = [
  {
    id: 'home',
    title: 'Home Page',
    description: 'Complete homepage with hero slider, services, features, and testimonials',
    icon: Home,
    fields: ['hero-slider', 'services', 'stats', 'features', 'testimonials', 'cta'],
  },
  {
    id: 'about',
    title: 'About Page',
    description: 'Company story, mission, vision, team, and history timeline',
    icon: Info,
    fields: ['hero', 'mission', 'stats', 'timeline', 'values', 'team', 'goals'],
  },
  {
    id: 'portfolio',
    title: 'Portfolio Page',
    description: 'Project showcase with filtering and detail views',
    icon: FolderOpen,
    fields: ['featured-projects', 'all-projects', 'filters', 'cta'],
  },
];

const exportFormats = [
  { id: 'html', label: 'HTML + CSS', icon: FileCode, desc: 'Standalone HTML file with embedded styles' },
  { id: 'react', label: 'React Component', icon: Layout, desc: 'JSX component ready to import' },
  { id: 'png', label: 'JSON Data', icon: FileJson, desc: 'Structured JSON data' },
];

export function ExportPage() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('html');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    if (!selectedPage) return;

    setIsExporting(true);
    setExportComplete(false);

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate export based on selection
    const pageData = exportOptions.find((p) => p.id === selectedPage);
    const format = selectedFormat;

    // Create downloadable content
    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'html') {
      content = generateHTMLExport(selectedPage);
      filename = `${pageData?.id || 'export'}.html`;
      mimeType = 'text/html';
    } else if (format === 'react') {
      content = generateReactExport(selectedPage);
      filename = `${pageData?.id || 'export'}.tsx`;
      mimeType = 'text/plain';
    } else {
      content = generateJSONExport(selectedPage);
      filename = `${pageData?.id || 'export'}.json`;
      mimeType = 'application/json';
    }

    // Download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    setExportComplete(true);
    setTimeout(() => setExportComplete(false), 3000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-dark-950 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        <div className="container-main relative z-10 py-32">
          <span className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-semibold tracking-wider mb-6">
            <Download className="w-4 h-4 mr-2" />
            EXPORT
          </span>
          <h1 className="heading-xl text-white mb-6">
            Export Your <span className="text-gradient">Design</span>
          </h1>
          <p className="text-dark-300 text-lg max-w-xl">
            Download clean, production-ready exports of our UI designs in multiple formats for your projects.
          </p>
        </div>
      </section>

      {/* Export Options */}
      <section className="section bg-dark-900">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            {/* Page Selection */}
            <div className="mb-12">
              <h2 className="font-semibold text-xl text-white mb-6">Select Page to Export</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {exportOptions.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                    className={`card p-6 text-left transition-all ${
                      selectedPage === page.id
                        ? 'border-primary-500 bg-primary-500/5'
                        : 'hover:border-dark-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      selectedPage === page.id ? 'bg-primary-500' : 'bg-primary-500/10'
                    }`}>
                      <page.icon className={`w-6 h-6 ${selectedPage === page.id ? 'text-white' : 'text-primary-400'}`} />
                    </div>
                    <h3 className="font-semibold text-lg text-white mb-2">{page.title}</h3>
                    <p className="text-dark-400 text-sm mb-4">{page.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {page.fields.slice(0, 3).map((field) => (
                        <span key={field} className="px-2 py-1 bg-dark-800 rounded text-dark-500 text-xs">
                          {field}
                        </span>
                      ))}
                      {page.fields.length > 3 && (
                        <span className="px-2 py-1 bg-dark-800 rounded text-dark-500 text-xs">
                          +{page.fields.length - 3} more
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="mb-12">
              <h2 className="font-semibold text-xl text-white mb-6">Export Format</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {exportFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-6 rounded-xl border transition-all text-left ${
                      selectedFormat === format.id
                        ? 'border-primary-500 bg-primary-500/5'
                        : 'border-dark-800 bg-dark-800/30 hover:border-dark-700'
                    }`}
                  >
                    <format.icon className={`w-8 h-8 mb-3 ${selectedFormat === format.id ? 'text-primary-400' : 'text-dark-400'}`} />
                    <h3 className="font-medium text-white mb-1">{format.label}</h3>
                    <p className="text-dark-400 text-sm">{format.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <div className="flex items-center justify-between p-6 bg-dark-800/50 rounded-2xl border border-dark-700">
              <div>
                <h3 className="font-semibold text-white">Ready to Export</h3>
                <p className="text-dark-400 text-sm">
                  {selectedPage
                    ? `Exporting ${exportOptions.find((p) => p.id === selectedPage)?.title} as ${exportFormats.find((f) => f.id === selectedFormat)?.label}`
                    : 'Select a page to export'}
                </p>
              </div>
              <button
                onClick={handleExport}
                disabled={!selectedPage || isExporting}
                className="btn-primary flex items-center gap-2"
              >
                {isExporting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Exporting...
                  </>
                ) : exportComplete ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Exported!
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Export Now
                  </>
                )}
              </button>
            </div>

            {/* Preview Note */}
            <div className="mt-8 p-6 bg-dark-800/30 rounded-xl border border-dark-800">
              <h3 className="font-semibold text-white mb-3">What's Included</h3>
              <ul className="space-y-2 text-dark-400 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  Complete HTML structure with semantic markup
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  Tailwind CSS classes for styling
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  Responsive design breakpoints
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  Lucide icons integration
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  Hover states and animations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-950">
        <div className="container-main text-center">
          <h2 className="heading-lg text-white mb-6">Need Custom Exports?</h2>
          <p className="text-dark-400 mb-8 max-w-xl mx-auto">
            Contact us for custom design exports, white-label solutions, or dedicated development services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Contact Sales
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Export generators
function generateHTMLExport(pageId: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PivotalStacks - ${pageId.charAt(0).toUpperCase() + pageId.slice(1)} Page Export</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-gray-100">
  <!-- Exported from PivotalStacks - ${pageId} page -->
  <div id="app"></div>
</body>
</html>`;
}

function generateReactExport(pageId: string): string {
  return `// Exported from PivotalStacks - ${pageId} page
import { Link } from 'react-router-dom';

export function ${pageId.charAt(0).toUpperCase() + pageId.slice(1)}Export() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* ${pageId} content */}
    </div>
  );
}`;
}

function generateJSONExport(pageId: string): string {
  const page = exportOptions.find((p) => p.id === pageId);
  return JSON.stringify({
    page: pageId,
    exportedAt: new Date().toISOString(),
    source: 'PivotalStacks',
    fields: page?.fields || [],
  }, null, 2);
}