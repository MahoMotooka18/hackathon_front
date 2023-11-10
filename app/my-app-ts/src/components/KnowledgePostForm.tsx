import { useState } from 'react';
import ChackboxContainer from './components/ChackboxContainer';
import Contents from './components/Contents';

const KnowledgePostForm  = () => {

    const [name, setName] = useState("");
    const [url, setURL] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedCurriculum, setSelectedCurriculum] = useState<string[]>([]);

    const category_checkList = ["技術ブログ","技術書","技術系動画"];
    const curriculum_checkList = ["OSコマンド","Git","HTML & CSS","JavaScript","React","React x Typescript",
    "SQL","Docker","Go","HTTP Server","RDBMS(MySQL)へ接続","Unit Test","フロントエンドとバックエンドの接続",
    "CI/CD","認証","ハッカソン"];


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setURL(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!name) {
        alert("名前が入力されていません");
        return;
      }

      if (name.length > 50) {
        alert("名前の文字数が50を超えています");
        return;
      }

      if (!url) {
        alert("URLが入力されていません");
        return;
      }

      if (selectedCategories.length === 0) {
        alert("少なくとも1つのカテゴリを選択してください");
        return;
      }
    
      if (selectedCurriculum.length === 0) {
        alert("少なくとも1つのカリキュラムの章を選択してください");
        return;
      }

    try {
      const result = await fetch("http://localhost:8050/knowledge", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          url: url,
          catetory: selectedCategories,
          curriculum:  selectedCurriculum
        }),
      });
      if (!result.ok) {
        throw Error(`情報の追加に失敗しました: ${result.status}`);
      }

      setName("");
      setURL("");
      setSelectedCategories([]); 
      setSelectedCurriculum([]);
      Contents

  } catch (err) {
    console.error(err);
  }

    return (
        <form onSubmit={handleSubmit}> 
        <h2>情報追加フォーム</h2>
        <div>
          <input type="text" id="name" placeholder="名前" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <input type="url" id="url" placeholder="URL(技術本は書籍紹介ページ等のURLを記載)" value={url} onChange={handleURLChange} />
        </div>
        <div>
        <ChackboxContainer name="カテゴリ" value={category_checkList} selectedValues={selectedCategories} 
        onChange={(selected) => setSelectedCategories(selected)}/>
        </div>
        <div>
        <ChackboxContainer name="該当するカリキュラムの章" value={curriculum_checkList} 
        selectedValues={selectedCurriculum} onChange={(selected) => setSelectedCurriculum(selected)}/>
        </div>
        <button type={"submit"}>追加</button>
        </form>

    ); 
  };
};

export default KnowledgePostForm;