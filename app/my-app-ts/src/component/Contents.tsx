import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { useNavigate } from 'react-router-dom';

interface Knowledge {
  id: UUID;
  name: string; 
  url: string;
  category: string;
  curriculum: string;
  updatedAt: string;
}



function Contents() {
  const [knowledge, setKnowledge] = useState<Knowledge[]>([]);
  const [sortBy, setSortBy] = useState('date');
  const [selectedItem, setSelectedItem] = useState<Knowledge | null>(null);
  const navigate = useNavigate();

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
        
      else if (sortBy === 'updatedAt') {
      return data.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
      }
      return data;
  };
    
    const sortedKnowledge = sortKnowledge(knowledge);
    const openItemDetails = (item: Knowledge) => {
      // 詳細表示用の state を更新
      setSelectedItem(item);
    };
  
    const closeItemDetails = () => {
      // 詳細表示用の state をクリア
      setSelectedItem(null);
    };

    const KnowledgeForm= () => {
      navigate('/knowledgepost');
    }

  
    const deleteItem = async (itemId: UUID) => {
      // バックエンドでアイテムを削除
      try {
        const res = await fetch(`http://localhost:8050/knowledge/${itemId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          throw Error(`アイテムの削除に失敗しました: ${res.status}`);
        }
  
        // 削除が成功したら、ローカルの state も更新
        setKnowledge((prevKnowledge) =>
          prevKnowledge.filter((item) => item.id !== itemId)
        );
      } catch (err) {
        console.error(err);
      }
    };

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
          {/* 更新日時でソート */}
          <label>
            <input
              type="radio"
              value="updatedAt"
              checked={sortBy === 'updatedAt'}
              onChange={() => setSortBy('updatedAt')}
            />
            更新日時でソート
          </label>
        </div>
        <ul>
          {sortedKnowledge ? (
            sortedKnowledge.map((item, index) => (
              <li key={item.id}>
                {/* アイテムの詳細表示へのリンク */}
                <span onClick={() => openItemDetails(item)}>
                  {item.name} - {item.curriculum}
                </span>
                {/* アイテムの削除ボタン */}
                <button onClick={() => deleteItem(item.id)}>削除</button>
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
        {/* アイテムの詳細表示 */}
        {selectedItem && (
          <div>
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.curriculum}</p>
            <p>{selectedItem.url}</p>
            <p>更新日時: {selectedItem.updatedAt}</p>
            {/* 閉じるボタン */}
            <button onClick={closeItemDetails}>閉じる</button>
          </div>
        )}
        <div>
        <button onClick={KnowledgeForm}>情報の追加</button>
        </div>
      </div>
    );
  }

  export default Contents;