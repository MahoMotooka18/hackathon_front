import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import KnowledgePostForm from './KnowledgePostForm'
interface Knowledge {
  id: UUID;
  name: string; 
  url: string;
  category: string;
  curriculum: string;
}



function Contents() {
  const [knowledge, setKnowledge] = useState<Knowledge[]>([]);
  const [sortBy, setSortBy] = useState('date');
  const fetchKnowledge = async () => {
      try {
          const res = await fetch("http://localhost:8050/knowledge");
          if (!res.ok) {
              throw Error(`情報の取得に失敗しました: ${res.status}`);
            }
            const knowledge: Knowledge[] = await res.json();
            setKnowledge(knowledge);
          } catch (err) {
            console.error(err);
            console.log("knowledgeのsetに失敗");
          }
        };


  useEffect(() => {
      fetchKnowledge();
    },[]);

  const sortKnowledge = (data: Knowledge[]) => {
      if (sortBy === 'date') {
      // 日付順でソート
      return data.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortBy === 'curriculum') {
      // curriculumの種類ごとにソート
      return data.sort((a, b) => a.curriculum.localeCompare(b.curriculum));
    }
  };
    
    const sortedKnowledge = sortKnowledge(knowledge);
      

    return (
      <div>
      <div>
        <label>
          <input
            type="radio"
            value="date"
            checked={sortBy === 'date'}
            onChange={() => setSortBy('date')}
          />
          追加日別でソート
        </label>
        <label>
          <input
            type="radio"
            value="curriculum"
            checked={sortBy === 'curriculum'}
            onChange={() => setSortBy('curriculum')}
          />
          カリキュラム別でソート
        </label>
      </div>
      <ul>
        {sortedKnowledge ? (
          sortedKnowledge.map((item, index) => (
             <li key={item.id}>
              {item.name} - {item.curriculum}
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
      <KnowledgePostForm />
      </div>
    );
  }
  
  export default Contents;