import { Link } from 'react-router-dom';

export default function Default() {
    return (
        <div className='w-90 ml-20 mt-4 mr-20'>
            <h1 className=' font-bold text-2xl'>CreateFlashcard</h1>
            
            <ul className='flex gap-10 font-bold text-red-400 mt-4'>
                <li><Link to="/">Create New</Link></li>
                <li><Link to="/mycards">My Flashcard</Link></li>
            </ul>

            <hr className="border bg-slate-300 border-slate-300 mb-8" />
        </div>
    );
}
