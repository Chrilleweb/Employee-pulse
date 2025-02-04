import Head from 'next/head';
import Button, {
  ButtonVariant,
  ButtonSize,
} from 'src/shared/components/Button/Button';
import EmojiButton from 'src/features/surveys/components/EmojiButton/EmojiButton';
import Header from 'src/shared/components/Header/Header';
import Loader from 'src/shared/components/Loader/Loader';
import { useSurveyAnswerManager } from 'src/features/surveys/managers/surveyAnswerManager';

function AnswerPage() {
  const {
    isLoading,
    question,
    icons,
    selectedIcon,
    handleIconClick,
    answer,
    handleInputAnswer,
    buttonDisable,
    handleSave,
  } = useSurveyAnswerManager();

  return (
    <>
      <Head>
        <title>Survey</title>
        <meta name="description" content="Survey - Employee Pulse" />
      </Head>
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <div className="container px-4 m-auto mb-6 text-center md:px-8">
          <Header>{question}</Header>

          <div className="grid  grid-cols-2  gap-2 mx-auto max-w-[500px] sm:grid-cols-4">
            {icons.map((icon, idx) => (
              <EmojiButton
                icon={icon}
                selected={selectedIcon === icon}
                key={idx}
                onClick={handleIconClick}
              />
            ))}
          </div>
          <div className="mt-8">
            <textarea
              className="p-4 w-[500px] max-w-[100%] h-56 rounded-lg focus:outline-none shadow resize-none"
              placeholder="Tell Us More"
              value={answer}
              onChange={handleInputAnswer}
            ></textarea>
          </div>
          <Button
            disabled={!selectedIcon || buttonDisable}
            onClick={handleSave}
            className="mt-6 w-full sm:w-auto"
            variant={ButtonVariant.PRIMARY}
            sizeType={ButtonSize.MEDIUM}
          >
            Send
          </Button>
        </div>
      )}
    </>
  );
}

export default AnswerPage;
