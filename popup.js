(() => {
  const el = id => document.getElementById(id);
  el('calcBtn').addEventListener('click', () => {
    let html = '';

    // SGPA-based
    const targetSgpa = parseFloat(el('targetSgpa').value);
    const currPts    = parseFloat(el('currPts').value);
    const dispMax    = parseFloat(el('dispMax').value);
    const realMaxMin = parseFloat(el('realMaxMin').value);
    const realMaxMax = parseFloat(el('realMaxMax').value);
    const examMax    = parseFloat(el('examMaxMarks').value);

    if (!isNaN(targetSgpa) && dispMax > 0 && realMaxMin >= dispMax && realMaxMax >= realMaxMin) {
      html += '<div class="card"><h2>SGPA Target Results</h2>';
      const totalCourse = 100;
      const targetTotal = (targetSgpa / 4.0) * totalCourse;
      [realMaxMin, realMaxMax].forEach(realMax => {
        const scaled = currPts * realMax / dispMax;
        const needAbs = targetTotal - scaled;
        const finalWt = totalCourse - realMax;
        const examScore = finalWt > 0 ? (needAbs / finalWt) * examMax : 0;
        const examPct = examMax > 0 ? (examScore / examMax) * 100 : 0;

        html += `
          <div class="result-row">
            <strong>If Pre-final = ${realMax.toFixed(1)} pts → Final wt = ${finalWt.toFixed(1)} pts</strong>
            <p>You Need <em>${needAbs.toFixed(2)} / ${finalWt.toFixed(2)} Absoultes  </em> 
            </p> 
            <p> Means  <em>${examScore.toFixed(2)}/${examMax}</em> (${examPct.toFixed(2)}%) Score on the Final Exam</p>
          </div>`;
      });
      html += '</div>';
    }


    if (html === '') html = '<p class="info">Please fill valid inputs above to calculate.</p>';
    el('result').innerHTML = html;
  });
})();