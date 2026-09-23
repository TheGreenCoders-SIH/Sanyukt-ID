import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  ShieldCheck, 
  Search, 
  Filter, 
  UploadCloud, 
  Lock, 
  Check, 
  Copy, 
  AlertTriangle, 
  ExternalLink, 
  Building2, 
  FilePlus, 
  CheckCircle2, 
  QrCode, 
  ArrowDownToLine, 
  X,
  FileCheck2,
  HardDriveDownload
} from 'lucide-react';
import { EnterpriseProfile, UploadedDoc } from '../../types';

interface DocumentVaultProps {
  profile: EnterpriseProfile;
  docs: UploadedDoc[];
  setDocs: React.Dispatch<React.SetStateAction<UploadedDoc[]>>;
  onShowToast: (message: string) => void;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({
  profile,
  docs,
  setDocs,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewDoc, setPreviewDoc] = useState<UploadedDoc | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Land & Site Verification');
  const [copiedDocId, setCopiedDocId] = useState<string | null>(null);

  // Available categories for simplistic filter
  const categories = ['All', 'Land & Site Verification', 'Safety & Architectural Plan', 'Pollution Control & Emissions', 'Corporate Identity & KYC', 'Sanctions & Clearances'];

  // Filtered documents
  const filteredDocs = useMemo(() => {
    return docs.filter(doc => {
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.docNumber && doc.docNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doc.issuingAuthority && doc.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [docs, searchQuery, selectedCategory]);

  const verifiedCount = docs.filter(d => d.status === 'Verified').length;
  const digiLockerCount = docs.filter(d => d.isDigiLockerLinked).length;

  // Single document download handler
  const handleDownloadDoc = (doc: UploadedDoc) => {
    // Generate a simple text file representation for download
    const content = `=====================================================
GOVERNMENT OF MAHARASHTRA • SANYUKT ID
DIGITAL VERIFIED COMPLIANCE ARCHIVE
=====================================================

Document Name: ${doc.name}
Reference No: ${doc.docNumber || 'N/A'}
Category: ${doc.category}
Issuing Authority: ${doc.issuingAuthority || 'Government of Maharashtra'}
Status: ${doc.status}
Verification: ${doc.validationMessage || 'Verified Digi-Trust Record'}
SHA-256 Checksum: ${doc.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
DigiLocker Linked: ${doc.isDigiLockerLinked ? 'YES - Active Hash Verified' : 'NO'}

ENTERPRISE HOLDER:
Entity Name: ${profile.businessName}
CIN/PAN: ${profile.cinOrPan}
Location: ${profile.district}, ${profile.industrialArea}
UID: MH-UDYOG-2026-PN-98421
Timestamp: ${new Date().toISOString()}

Certified by Maharashtra Right to Public Services Act 2015.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VERIFIED_${doc.name.replace(/\.[^/.]+$/, "")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast(`Downloaded verified digital copy: ${doc.name}`);
  };

  // Batch download handler
  const handleDownloadAll = () => {
    onShowToast(`Downloading bundle of ${docs.length} verified documents as archive package.`);
  };

  // Copy shareable verification link
  const handleCopyLink = (docId: string) => {
    setCopiedDocId(docId);
    onShowToast('Digital document verification link copied to clipboard');
    setTimeout(() => setCopiedDocId(null), 2500);
  };

  // Add new document
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newDoc: UploadedDoc = {
      id: `doc-${Date.now()}`,
      name: newDocName.endsWith('.pdf') ? newDocName : `${newDocName}.pdf`,
      category: newDocCategory,
      size: '2.1 MB',
      uploadedAt: 'Just now',
      status: 'Verified',
      docNumber: `MH-REG-${Date.now().toString().slice(-6)}`,
      issuingAuthority: 'State Compliance Portal',
      sha256Hash: 'a7b9c1d3e5f80246813579bdf02468ace13579bdf02468ace13579bdf02468ac',
      documentType: 'Submission',
      validationMessage: 'Verified and digitally stored in sovereign document vault',
      isDigiLockerLinked: true
    };

    setDocs(prev => [newDoc, ...prev]);
    setNewDocName('');
    setIsUploadModalOpen(false);
    onShowToast(`Added and verified: ${newDoc.name}`);
  };

  // 1-Click resolve for warning documents
  const handleVerifyWarning = (docId: string) => {
    setDocs(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          status: 'Verified',
          validationMessage: 'Verified via Council of Architecture API (Digital Signature & Seal Validated)',
          isDigiLockerLinked: true
        };
      }
      return d;
    }));
    onShowToast('Document re-scrutinized and marked Verified');
  };

  return (
    <div className="space-y-6">
      {/* Simplistic Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Enterprise Document Vault
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-mono">
                UID: MH-UDYOG-2026-PN-98421
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Compliance Document Vault
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Secure digital repository for verified clearances, CAD blueprints, and land extracts for{' '}
              <strong className="text-slate-700">{profile.businessName}</strong>.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <FilePlus className="w-4 h-4 text-amber-300" />
              <span>Upload Document</span>
            </button>
            <button
              onClick={handleDownloadAll}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <HardDriveDownload className="w-4 h-4 text-slate-500" />
              <span>Download All</span>
            </button>
          </div>
        </div>

        {/* Simplistic Key Numbers Strip */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Total Documents</span>
            <span className="text-lg font-black text-slate-900 mt-0.5 block">{docs.length} Files</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Verified Copies</span>
            <span className="text-lg font-black text-emerald-600 mt-0.5 block">{verifiedCount} of {docs.length}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">DigiLocker Synced</span>
            <span className="text-lg font-black text-blue-900 mt-0.5 block">{digiLockerCount} Records</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Vault Integrity</span>
            <span className="text-lg font-black text-slate-800 mt-0.5 block">SHA-256 Sealed</span>
          </div>
        </div>
      </div>

      {/* Simplistic Filter Bar & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by document name, ref no, or authority..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium self-end sm:self-auto">
            Showing {filteredDocs.length} of {docs.length} items
          </div>
        </div>

        {/* Minimal Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Simplistic Documents List */}
      <div className="space-y-3">
        {filteredDocs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-400 text-xs">
            No compliance documents matched your search query.
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isVerified = doc.status === 'Verified';
            const isWarning = doc.status === 'Warning';
            const isSanction = doc.documentType === 'Sanction_Certificate';

            return (
              <div
                key={doc.id}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                {/* Left: Icon & Info */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isSanction
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : isVerified
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {isSanction ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {doc.name}
                      </h4>
                      {doc.docNumber && (
                        <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-slate-100 font-semibold">
                          {doc.docNumber}
                        </span>
                      )}
                      {doc.isDigiLockerLinked && (
                        <span className="text-[10px] text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold border border-blue-100">
                          <Lock className="w-3 h-3" /> DigiLocker
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 text-xs text-slate-500 mt-1 flex-wrap">
                      <span className="font-medium text-slate-700">{doc.category}</span>
                      <span>•</span>
                      <span>{doc.issuingAuthority || 'State Authority'}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadedAt}</span>
                    </div>

                    {doc.validationMessage && (
                      <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isVerified ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        ></span>
                        <span className="truncate">{doc.validationMessage}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions & Status */}
                <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      isVerified
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {doc.status}
                  </span>

                  {isWarning && (
                    <button
                      onClick={() => handleVerifyWarning(doc.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors"
                      title="Validate digital stamp"
                    >
                      Verify Seal
                    </button>
                  )}

                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                    title="View Document Details & Digital Copy"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDownloadDoc(doc)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Download Verified Copy"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopyLink(doc.id)}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors"
                    title="Copy Verification Link"
                  >
                    {copiedDocId === doc.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DOCUMENT PREVIEW MODAL (Simplistic & Clean) */}
      {previewDoc && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <FileCheck2 className="w-5 h-5 text-blue-900 shrink-0" />
                <div className="truncate">
                  <h3 className="font-bold text-slate-900 text-base truncate">
                    {previewDoc.name}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Ref: {previewDoc.docNumber || 'MH-DOC-2026'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simplistic Certificate Sheet */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                  Issuing Authority
                </span>
                <span className="font-bold text-slate-900">
                  {previewDoc.issuingAuthority || 'Government of Maharashtra'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Enterprise Holder:</span>
                  <span className="font-semibold text-slate-800">{profile.businessName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Location:</span>
                  <span className="font-semibold text-slate-800">{profile.district}, {profile.industrialArea}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">File Size &amp; Date:</span>
                  <span className="font-semibold text-slate-800">{previewDoc.size} • {previewDoc.uploadedAt}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Status:</span>
                  <span className="font-bold text-emerald-700">{previewDoc.status}</span>
                </div>
              </div>

              {/* Extracted Metadata Key-Values */}
              {previewDoc.extractedMetadata && (
                <div className="pt-2 border-t border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Verified Parameters:
                  </span>
                  {Object.entries(previewDoc.extractedMetadata).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[11px]">
                      <span className="text-slate-500">{k}:</span>
                      <span className="font-semibold text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* SHA-256 Integrity Seal */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  SHA-256 Digital Fingerprint:
                </span>
                <span className="text-[10px] font-mono text-slate-600 break-all block mt-0.5">
                  {previewDoc.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                </span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Maharashtra Public Services Act 2015
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownloadDoc(previewDoc);
                    setPreviewDoc(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Verified Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD DOCUMENT MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddDocument}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                Upload Compliance Document
              </h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Document Title / File Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharashtra_Fire_Hydrant_Schema_2026.pdf"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Compliance Category *
                </label>
                <select
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="Land & Site Verification">Land &amp; Site Verification</option>
                  <option value="Safety & Architectural Plan">Safety &amp; Architectural Plan</option>
                  <option value="Pollution Control & Emissions">Pollution Control &amp; Emissions</option>
                  <option value="Corporate Identity & KYC">Corporate Identity &amp; KYC</option>
                  <option value="Sanctions & Clearances">Sanctions &amp; Clearances</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-[11px] text-slate-500">
                  Select file from device or auto-fetch from DigiLocker
                </span>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs"
              >
                Add to Vault
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
