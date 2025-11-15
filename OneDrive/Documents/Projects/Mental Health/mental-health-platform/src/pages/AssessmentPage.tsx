import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'depression' | 'anxiety' | 'trauma' | 'adhd' | 'ptsd' | 'general';
}

const availableAssessments: Assessment[] = [
  {
    id: 'phq-9',
    title: 'PHQ-9 Depression Screening',
    description: 'A 9-question screening for depression severity',
    duration: '2-3 minutes',
    type: 'depression'
  },
  {
    id: 'gad-7',
    title: 'GAD-7 Anxiety Assessment',
    description: 'A 7-question screening for generalized anxiety disorder',
    duration: '2-3 minutes',
    type: 'anxiety'
  },
  {
    id: 'ptsd-5',
    title: 'PTSD-5 Screening',
    description: 'A brief screening for post-traumatic stress disorder',
    duration: '3-4 minutes',
    type: 'ptsd'
  },
  {
    id: 'adhd',
    title: 'ADHD Screening',
    description: 'A comprehensive screening for attention deficit hyperactivity disorder',
    duration: '5-7 minutes',
    type: 'adhd'
  },
  {
    id: 'trauma',
    title: 'Trauma History Assessment',
    description: 'A gentle assessment of past traumatic experiences',
    duration: '5-10 minutes',
    type: 'trauma'
  },
  {
    id: 'wellness',
    title: 'General Wellness Check',
    description: 'A comprehensive check of your overall mental wellbeing',
    duration: '3-5 minutes',
    type: 'general'
  }
];

export default function AssessmentPage() {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);

  const startAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    toast.info('Assessment feature coming soon!');
  };

  const getTypeColor = (type: string) => {
    const colors = {
      depression: 'bg-blue-100 text-blue-800',
      anxiety: 'bg-purple-100 text-purple-800',
      trauma: 'bg-orange-100 text-orange-800',
      adhd: 'bg-green-100 text-green-800',
      ptsd: 'bg-red-100 text-red-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.general;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Mental Health Assessments
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Take confidential assessments to better understand your mental health. 
          These tools can help you identify areas where you might benefit from support.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>Important:</strong> These assessments are for informational purposes only and 
            do not replace professional diagnosis. If you're in crisis, please visit our{' '}
            <Link to="/crisis-support" className="font-medium text-blue-600 hover:text-blue-500">
              Crisis Support page
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableAssessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {assessment.title}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(assessment.type)}`}>
                {assessment.type.toUpperCase()}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">
              {assessment.description}
            </p>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {assessment.duration}
            </div>
            
            <button
              onClick={() => startAssessment(assessment.id)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          How Our Assessments Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Confidential</h3>
            <p className="text-sm text-gray-600">
              Your responses are completely confidential and secure
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Quick & Easy</h3>
            <p className="text-sm text-gray-600">
              Most assessments take just 2-5 minutes to complete
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Helpful Resources</h3>
            <p className="text-sm text-gray-600">
              Get personalized recommendations based on your results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}