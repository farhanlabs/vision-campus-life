import { useState, useEffect } from 'react';
import { subscribeToValue } from '@/lib/firebase';
import { X } from 'lucide-react';

const AdmissionPopup = () => {
  const [popup, setPopup] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const unsub = subscribeToValue('admissionPopup', setPopup);
    return () => unsub();
  }, []);

  if (!popup?.active || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 p-4">
      <div className="bg-card rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-fade-in-up">
        <button onClick={() => setDismissed(true)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>
        <div className="text-center">
          <h2 className="font-heading text-2xl text-primary mb-2">{popup.title || 'Admissions Open!'}</h2>
          <p className="text-muted-foreground mb-4">{popup.content || 'Apply now for the upcoming academic session.'}</p>
          {popup.imageUrl && <img src={popup.imageUrl} alt="Admission" className="rounded-md mx-auto mb-4 max-h-48 object-cover" />}
          <a href="/admission/apply" className="inline-block px-6 py-2 bg-gold text-navy-dark font-semibold rounded hover:bg-gold-light transition-colors">
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPopup;
