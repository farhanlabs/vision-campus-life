import { useState, useEffect } from 'react';
import { subscribeToValue } from '@/lib/firebase';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdmissionPopup = () => {
  const [popup, setPopup] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const unsub = subscribeToValue('admissionPopup', setPopup);
    return () => unsub();
  }, []);

  if (!popup?.active || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 p-4" onClick={() => setDismissed(true)}>
      <div className="bg-card rounded-lg shadow-2xl max-w-lg w-full relative animate-fade-in-up overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={() => setDismissed(true)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-foreground/50 text-white hover:bg-foreground/70 flex items-center justify-center transition-colors">
          <X size={18} />
        </button>
        {/* Full banner image */}
        {popup.imageUrl && (
          <img src={popup.imageUrl} alt={popup.title || 'Admission Banner'} className="w-full object-contain max-h-[70vh]" />
        )}
        {!popup.imageUrl && (
          <div className="p-8 text-center">
            <h2 className="font-heading text-2xl text-primary mb-2">{popup.title || 'Admissions Open!'}</h2>
            <p className="text-muted-foreground mb-4">{popup.content || 'Apply now for the upcoming academic session.'}</p>
          </div>
        )}
        {/* Action buttons below banner */}
        <div className="p-4 bg-cream flex flex-col sm:flex-row gap-3 items-center justify-center">
          <a href="https://mecw-admission.vercel.app/#admission" target="_blank" rel="noreferrer"
            className="px-6 py-2.5 bg-gold text-white font-bold rounded hover:brightness-110 transition-all text-sm inline-flex items-center gap-2 shadow-lg">
            Apply Now →
          </a>
          <Link to="/admission/enquiry" onClick={() => setDismissed(true)}
            className="px-6 py-2.5 bg-maroon text-white font-bold rounded hover:bg-maroon-light transition-all text-sm inline-flex items-center gap-2">
            Admission Enquiry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPopup;
