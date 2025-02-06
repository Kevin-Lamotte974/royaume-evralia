import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const formatText = async (content) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `

    INSTRUCTION DE FORMATAGE HTML - RÈGLES ABSOLUES:

    1. LE TEXTE DOIT RESTER STRICTEMENT IDENTIQUE
    Ta seule tâche est d'ajouter des balises HTML et du style CSS autour du texte existant.

    TEXTE ORIGINAL (À NE PAS MODIFIER) :
    """
    ${content}
    """

    RÈGLES IMPORTANTES :
    1. Conserve exactement le même texte.
    2. Applique des balises HTML sémantiques pour structurer correctement le contenu : <h1>, <h2>, <p>, <ul>, <li>, <strong>, <em>, etc.
    3. Tu dois absolument utilisee du style CSS inline pour améliorer la présentation, ne lésigne pas il faut que ce soit attractif. Voici des éléments à appliquer :
       - Des couleurs modernes pour chaque section. Utilies ces couleurs : rgb(230,0,0), rgb(255,153,0), rgb(255,255,0), rgb(0,138,0), rgb(0,102,204), rgb(153,51,255).
       - Mets en valeur les éléments importants avec des balises comme <strong> pour le gras et <em> avec couleur pour l'italique.
       - Utilise un espacement approprié pour chaque paragraphe et entre chaque liste à puces ou section.
       - Applique des lignes de séparation (<hr>) là où c’est pertinent pour distinguer les parties du texte.
       - Applique des couleurs vives pour les points importants
    4. Les titres doivent être clairement visibles, les paragraphes espacés et les informations importantes doivent ressortir par rapport au reste du texte avec des éléments tel que des couleurs ou du gras.
    5. Ne modifie pas le contenu original du texte, juste l'apparence visuelle.
    6. Retourne uniquement le HTML formaté, sans commentaires, sans modifier le texte.
    7. NE CHANGE PAS UN SEUL MOT du texte original
    8. NE SUPPRIME RIEN

    RETOURNE UNIQUEMENT LE HTML FORMATÉ, PAS DE COMMENTAIRES.`;

    const result = await model.generateContent(prompt);
    let formattedText = result.response.candidates[0].content.parts[0].text;
    
    // Nettoyage amélioré du texte formaté
    formattedText = formattedText
      // Supprime les blocs de code Markdown
      .replace(/```html/g, '')
      .replace(/```/g, '')
      // Supprime les instructions qui pourraient être incluses
      .replace(/RÈGLES IMPORTANTES[\s\S]*?(\<|\n\n)/, '<')
      .replace(/Instructions?:?[\s\S]*?(\<|\n\n)/, '<')
      // Supprime les lignes vides au début
      .replace(/^\s*[\r\n]+/, '')
      // Nettoie les espaces multiples
      .replace(/\s+/g, ' ')
      // Nettoie les espaces avant les balises fermantes
      .replace(/\s+>/g, '>')
      // Nettoie les espaces après les balises ouvrantes
      .replace(/<\s+/g, '<')
      .trim();

    // S'assure que le texte commence par une balise HTML
    if (!formattedText.startsWith('<')) {
      formattedText = `<div style="color: #333; line-height: 1.6;">${formattedText}</div>`;
    }

    console.log("Texte nettoyé:", formattedText);
    return formattedText;

  } catch (error) {
    console.error('Erreur lors du formatage du texte:', error);
    return `<div style="color: #333; line-height: 1.6;">${content}</div>`;
  }
};
