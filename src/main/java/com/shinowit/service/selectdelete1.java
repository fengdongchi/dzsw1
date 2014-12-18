package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/26.
 */
@Service
public class selectdelete1 {
    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> detaildao;
    @Resource
    private BaseDAO<TMeOutStockInfo> outstockdao;

    public boolean seldel(String arry[]){
        boolean result=false;
        try{
            for(String ss : arry){
                //判断明细中数据条数！
                int i=detaildao.queryRecordCount("select count(*) from TMeOutStockDetailsInfo where TMeOutStockInfoByOutBillCode.outBillCode=?",ss);
                if(i==0){
                    outstockdao.executeHQL("delete from TMeOutStockInfo where outBillCode=?",ss);
                    result = true;
                }
                else {


                }

            }

        }catch(Exception e){
            e.printStackTrace();
        }

        return result;
    }

}
