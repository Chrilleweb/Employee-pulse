import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { formatFirebaseDateWithoutHours } from '../../shared/utilities/convertTime';
import withAnimation from '../../shared/HOC/withAnimation';
import Image from 'next/image';
import withProtectedRoute from '../../shared/HOC/withProtectedRoute';
import Head from 'next/head';
import Header from 'src/shared/components/Header/Header';
import SurveyRow from 'src/features/surveys/components/SurveyRow/SurveyRow';
import { useSurveyListManager } from 'src/features/surveys/managers/surveyListManager';

function SurveyListPage() {
  const { error, loading, surveysCollection } = useSurveyListManager();
  const [showOnlyWithFeedback, setShowOnlyWithFeedback] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowOnlyWithFeedback(event.target.checked);
  };

  const filteredSurveys = (surveys) => {
    return showOnlyWithFeedback
      ? surveys.filter((doc) => {
        const survey = doc.data();
        return survey.additionalFeedback;
      })
      : surveys;
  };

  return (
    <>
      <Head>
        <title>Surveys</title>
        <meta name="description" content="Surveys - Employee Pulse" />
      </Head>
      <div className="container m-auto text-center md:px-8">
        <Header>Surveys</Header>

        <div className="flex flex-col justify-center items-center">
          <label htmlFor="showOnlyWithFeedback" className="mb-4">
            <input
              type="checkbox"
              id="showOnlyWithFeedback"
              name="showOnlyWithFeedback"
              checked={showOnlyWithFeedback}
              onChange={handleCheckboxChange}
            />
            {' '}Show only surveys with additional feedback
          </label>
          
          {error && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}
          {loading && <p>Loading...</p>}

          {surveysCollection &&
            (filteredSurveys(surveysCollection.docs)?.length > 0 ? (
              filteredSurveys(surveysCollection.docs).map((doc) => {
                const survey = doc.data();
                return (
                  <SurveyRow
                    key={doc.id}
                    id={doc.id}
                    question={survey.title}
                    startDate={formatFirebaseDateWithoutHours(
                      survey.startDate as Timestamp
                    )}
                    endDate={formatFirebaseDateWithoutHours(
                      survey.endDate as Timestamp
                    )}
                  ></SurveyRow>
                );
              })
            ) : (
              <>
                <Image
                  className="mt-2 w-[200px] -translate-x-3"
                  src={'/images/no-surveys.svg'}
                  alt="no surveys"
                  width="200"
                  height="125"
                />
                <p className="mt-8">No surveys yet </p>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
export default withProtectedRoute(withAnimation(SurveyListPage));

