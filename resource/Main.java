//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;
import model.Student;

import java.io.*;
import java.util.*;



/*
해당 면접시간을 선택한 사람을 선택
그 사람들을 오름차순 정렬(기준: 선택한 개수)
적게 선택한 사람부터 면접시간에 넣어줌
넣어준 사람은 제외시키고 나머지 사람들도 해당 시간을 제외시킴 -> 나중에 정렬할때 이미 없어진 시간을 있다고 하면 안되니까
 */

public class Main {
    public static void main(String[] args) throws IOException, CsvValidationException {
        //이름, 학번, 18-19, 19-20, 20-21, 21-22
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        //입력 ->날짜 수, 시간 수, 한 타임당 사람 수
        StringTokenizer st = new StringTokenizer(br.readLine());
        int row = Integer.parseInt(st.nextToken());
        int col = Integer.parseInt(st.nextToken());
        int unit = Integer.parseInt(st.nextToken());
        //csv 경로
        String dir = br.readLine();
        LinkedList<Student> students = new LinkedList<>();
        String[][] timeTable = new String[row][col];
        for (int i = 0; i < row; i++) {
            timeTable[i] = new String[col];
            for (int j = 0; j < col; j++) {
                timeTable[i][j] = "";
            }
        }
        HashMap<String, Boolean> map = new HashMap<>();

        CSVReader csvReader = new CSVReader(new FileReader(dir));
        String[] csvLine;
        while ((csvLine = csvReader.readNext()) != null) {
            String name = csvLine[0];
            String personalNum = csvLine[1];
            LinkedList<String> possibleTime = new LinkedList<>();
            possibleTime.add(csvLine[2]);
            possibleTime.add(csvLine[3]);
            possibleTime.add(csvLine[4]);
            possibleTime.add(csvLine[5]);
            if (!map.containsKey(personalNum)) {
                map.put(personalNum, true);
                students.add(new Student(name, personalNum, possibleTime, col, row));
            }
        }


        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                Collections.sort(students);
                LinkedList<String> list = new LinkedList<>();
                int cnt = 0;
                for (int k = 0; k < students.size() && cnt < unit; k++) {
                    if (students.get(k).isPossible(i, j)) {
                        timeTable[i][j] += students.get(k).getName() + "/" + students.get(k).getPersonalNum() + ",";
                        list.add(students.get(k).getPersonalNum());
                        cnt++;
                    }
                }

                for (String s : list) {
                    for (int k = 0; k < students.size(); k++) {
                        if (students.get(k).getPersonalNum().equals(s)) {
                            students.remove(k);
                            break;
                        }
                    }
                }

                if (!timeTable[i][j].isEmpty()) {
                    for (Student student : students) {
                        student.deleteTime(i, j);
                    }
                }

                try {
                    timeTable[i][j] = timeTable[i][j].substring(0, timeTable[i][j].length() - 2);//마지막 , 제거
                } catch (IndexOutOfBoundsException e) {
                }

            }
        }
        List<String[]> data = new ArrayList<>();
        for (int i = 0; i < row; i++) {
            data.add(new String[col]);
            System.arraycopy(timeTable[i], 0, data.get(i), 0, col);
        }


        String filePath = "C:\\Users\\kksu1\\OneDrive\\문서\\output.csv";
        CSVWriter writer = new CSVWriter(new FileWriter(filePath));
        writer.writeAll(data);


        for (int i = 0; i < row; i++) {
            StringBuilder sb = new StringBuilder();
            for (int j = 0; j < col; j++) {
                sb.append("\"").append(timeTable[i][j]).append("\"").append(",");
            }
            sb.deleteCharAt(sb.length() - 1);
            sb.append("\n");
            bw.write(sb.toString());
        }
        bw.flush();
        bw.close();
    }
}
