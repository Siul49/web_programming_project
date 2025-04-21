
package model;
import java.util.LinkedList;
import java.util.StringTokenizer;

    public class Student implements Comparable<Student>{
        String name;
        String personalNum;
        Boolean[][] possibleTable;
        int selectCnt;
        final int column;
        final int row;

        @Override
        public int compareTo(Student o) {
            return this.selectCnt - o.selectCnt;
        }
        // selectCnt 0인 사람 따로 출력해야함
        public Student(String name, String personalNum, LinkedList<String> possibleTime, int column, int row) {
            this.name = name;
            this.personalNum = personalNum;
            this.column = column; //날짜
            this.row = row; //시간
            possibleTable = new Boolean[row][column];
            for (int i = 0; i < row; i++) {
                possibleTable[i] = new Boolean[column];
                for (int j = 0; j < column; j++) {
                    possibleTable[i][j] = false;
                }
            }
            selectCnt = 0;

            int cnt = 0;
            for (String s : possibleTime){
                if (s.length() > 7) {
                    StringTokenizer st = new StringTokenizer(s, ", ");
                    for (int i = 0; i < column; i++) {
                        try{
                            int tmp = switch (st.nextToken()) {
                                case "3/10(월)" -> 0;
                                case "3/11(화)" -> 1;
                                case "3/12(수)" -> 2;
                                default -> 0;
                            };
                            possibleTable[cnt][tmp] = true;
                            selectCnt++;
                        } catch (Exception e) {
                            break;
                        }
                    }
                } else {
                    int tmp = switch (s) {
                        case "3/10(월)" -> 0;
                        case "3/11(화)" -> 1;
                        case "3/12(수)" -> 2;
                        default -> 0;
                    };
                    possibleTable[cnt][tmp] = true;
                    selectCnt++;
                }
                cnt++;
            }
        }

        public void deleteTime(int row, int col){
            if (possibleTable[row][col] != null && possibleTable[row][col]) {
                possibleTable[row][col] = false;
                selectCnt--;
            }
        }

        public boolean isPossible(int row, int col){
            return possibleTable[row][col];
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPersonalNum() {
            return personalNum;
        }

        public void setPersonalNum(String personalNum) {
            this.personalNum = personalNum;
        }

        public Boolean[][] getPossibleTable() {
            return possibleTable;
        }

        public void setPossibleTable(Boolean[][] possibleTable) {
            this.possibleTable = possibleTable;
        }

        public int getColumn() {
            return column;
        }

        public int getRow() {
            return row;
        }

}
