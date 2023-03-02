import { useParams } from 'react-router-dom';
import BookDetails from '../../components/book_details/book_details.component';

const SubjectPage = () => {
  const { subject } = useParams();
  return (
    <div>
      <BookDetails subject={subject} />
    </div>
  );
};

export default SubjectPage;
