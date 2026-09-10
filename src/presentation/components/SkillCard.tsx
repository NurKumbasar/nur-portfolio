import type { SkillCategory } from '../../domain/entities/SkillCategory'

// ProjectCard.tsx'teki `tags` listesini gösterme kısmıyla BİREBİR aynı
// desen — oraya bakıp karşılaştırabilirsin.
//
// TODO: Aşağıdaki component'i tamamla.
// - <h3> içinde props.category.title göster
// - skills listesindeki her yetenek için bir <span> üret (.map() ile,
//   key olarak yeteneğin kendisini kullan)
//
export function SkillCard(props: { category: SkillCategory }) {
   return (
     <div className="glass-card">
       <h3>{props.category.title}</h3>
       <div>
         {props.category.skills.map((skill) => (
           <span key={skill} className="tag">{skill}</span>
         ))}
       </div>
     </div>
   )
 }
