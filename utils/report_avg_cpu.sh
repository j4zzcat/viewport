
# RPI
top_log='/tmp/top.log'
clean_log='/tmp/top.clean.log'
eval top -p $(pgrep ffmpeg | xargs | sed -e 's/ / -p /g') -n 30 -b >"$top_log"
grep <"$top_log" -A5 PID | grep -v '^    PID' | grep -v '^--' | sort | awk '{print $1, $9}' >"$clean_log"
for pid in $(sort <"$clean_log" | awk '{print $1}' | uniq); do
  grep <"$clean_log" "$pid" | awk 'BEGIN{s=0}{s=s+$2}END{print '"$pid"', s/NR}'
done

